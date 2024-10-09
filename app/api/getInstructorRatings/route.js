import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB';

export async function GET() {
  try {
    const ratings = await prisma.ratings.findMany({
      select: {
        instructorId: true,
        userId: true, // Assuming there is a userId field in the ratings table
        rate1: true,
        rate2: true,
        rate3: true,
        rate4: true,
        rate5: true,
      },
    });

    // Process the data to calculate the count of ratings and unique users per instructor
    const instructorStats = {};

    ratings.forEach((rating) => {
      const { instructorId, userId, rate1, rate2, rate3, rate4, rate5 } = rating;

      // Initialize instructor entry if not already present
      if (!instructorStats[instructorId]) {
        instructorStats[instructorId] = {
          instructorId,
          userIds: new Set(), // Use a Set to store unique user IDs
          ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, // Counts of each rating
          totalRatings: 0, // Total number of ratings
        };
      }

      // Add the userId to the Set (automatically handles uniqueness)
      instructorStats[instructorId].userIds.add(userId);

      // Check each rate, and if it's present, increment the respective rating count and the total number of ratings
      [rate1, rate2, rate3, rate4, rate5].forEach((rate) => {
        if (rate >= 1 && rate <= 5) { // Ensure it's a valid rating
          instructorStats[instructorId].ratingCounts[rate] += 1; // Increment count for the specific rating
          instructorStats[instructorId].totalRatings += 1; // Increment total rating count by 1
        }
      });
    });

    // Get the list of instructorIds to fetch instructor details
    const instructorIds = Object.keys(instructorStats).map((id) => id.toString()); // Convert to strings

    // Fetch the instructor details
    const instructorDetails = await prisma.instructors.findMany({
      where: {
        id: {
          in: instructorIds, // Only fetch the instructors in the stats list
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        field: true,
        // Include other fields you need
      },
    });

    // Combine instructor details with their rating stats
    const rankedInstructors = instructorDetails.map((instructor) => {
      const stats = instructorStats[instructor.id];

      return {
        ...instructor, // Spread instructor details (e.g., name, email)
        ratings: stats.ratingCounts, // Add rating counts (how many 1s, 2s, etc.)
        totalRatings: stats.totalRatings, // Add total number of all ratings (including all 1s, 2s, etc.)
        userRatingCount: stats.userIds.size, // Total unique users who rated this instructor
      };
    });

    // Sort instructors by the number of 4 or 5 ratings, or by total rating
    rankedInstructors.sort(
      (a, b) => b.ratings[4] + b.ratings[5] - (a.ratings[4] + a.ratings[5])
    );

    // Return the ranked instructors as a response
    return NextResponse.json(rankedInstructors);
  } catch (error) {
    console.error("Error fetching instructors and ratings:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructors and ratings" },
      { status: 500 }
    );
  }
}
