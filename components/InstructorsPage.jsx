import  { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const InstructorsPage = () => {

  const [instructorRatings,setInstructorRatings] = useState([]);

  useEffect(() => {
    async function getInstructorsRatings() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('http://localhost:3000/api/getInstructorRatings'); // Replace with your actual API route
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Assuming the API returns JSON data
        console.log(data);
        setInstructorRatings(data); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getInstructorsRatings(); // Call the function inside the useEffect
  },[])

  return (
    <div className='grid grid-cols-2 gap-8'>
      {instructorRatings?.map(val => (
      <Card key={val.id} className="w-[350px]">
         <CardHeader>
         <CardTitle>{val.name}</CardTitle>
         <CardDescription>{val.email}</CardDescription>
       </CardHeader>
       <CardContent>
        <h2>Total Ratings: {val.totalRatings}</h2>
        
       </CardContent>
       <CardFooter className="flex justify-between">
       
       </CardFooter>
     </Card>
      )) }
       
     
    </div>
  )
}

export default InstructorsPage