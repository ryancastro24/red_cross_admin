import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB';

export async function GET() {
  const currentYear = new Date().getFullYear();

  // Fetch all users for the current year
  const users = await prisma.userInfo.findMany({
    where: {
      userType:"user",
      dateCreated: {
        gte: new Date(currentYear, 0, 1),  // January 1st of the current year
        lt: new Date(currentYear + 1, 0, 1),  // January 1st of the next year
      },
    },
    select: {
      dateCreated: true,
      category: true,  // Assuming there is a "category" field with "standard" or "occupational"
    },
  });

  // Initialize an object with all months of the current year
  const dataPerMonth = {};
  for (let i = 0; i < 12; i++) {
    const yearMonth = `${currentYear}-${String(i + 1).padStart(2, '0')}`; // Format: YYYY-MM
    dataPerMonth[yearMonth] = { standard: 0, occupational: 0 };
  }

  // Iterate through the user data and populate the months
  users.forEach((user) => {
    const date = new Date(user.dateCreated);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Get year-month format
    const category = user.category;

    // Increment the count based on the user's category
    if (category === 'standard') {
      dataPerMonth[yearMonth].standard += 1;
    } else if (category === 'occupational') {
      dataPerMonth[yearMonth].occupational += 1;
    }
  });

  // Format the data into a response, ordered by month (it’s naturally ordered because of the loop)
  const formattedData = Object.keys(dataPerMonth).map((month) => ({
    month,
    standard: dataPerMonth[month].standard,
    occupational: dataPerMonth[month].occupational,
  }));

  return NextResponse.json(formattedData);
}
