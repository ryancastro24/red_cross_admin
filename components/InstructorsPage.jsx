import  { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InstructorCardSkeleton from './InstructorCardSkeleton';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Progress } from "@/components/ui/progress"
const InstructorsPage = () => {

  const [instructorRatings,setInstructorRatings] = useState([]);
  const [instructorId,setInstructorId] = useState("");
  const [allUserRatings,setAllUserRatings] = useState([]);
  const [userRatings,setUserRatings] = useState(true);
  const [loading,setLoading] = useState(true);
  const [userRatingLoading,setUserRatingLoading] = useState(true);
 
  useEffect(() => {
    async function getInstructorsRatings() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('http://localhost:3000/api/getInstructorRatings'); // Replace with your actual API route
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Assuming the API returns JSON data
        
        setInstructorRatings(data); // Set the state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getInstructorsRatings(); 
  },[])



  useEffect(() => {

    async function getAllUserRatings() {
      try {
        // Fetch data from your API endpoint
        const response = await fetch(`http://localhost:3000/api/getAllUserRatings/${instructorId}` ); // Replace with your actual API route
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Assuming the API returns JSON data
        console.log(data);
        setAllUserRatings(data); // Set the state with the fetched data
        setUserRatingLoading(false)
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  

    getAllUserRatings(); 
  },[instructorId])



  const handleRatingRange = (rating, numberOfUsers) => {
    console.log(`Rating: ${rating}, Number of Users: ${numberOfUsers}`);
    
    // Calculate the maximum possible ratings
    const maxRating = 5 * numberOfUsers; 
    console.log(`Max Rating: ${maxRating}`);
  
    // Calculate the final rating percentage
    const finalRating = (rating / maxRating); 
    const result = finalRating * 100; 
  
    // Use Math.floor() to remove decimals
    const finalResult = Math.floor(result); 
    
    if(finalResult === 0) {
      return 10;
    }

    return finalResult;
  };

  return (

   <div className='h-[600px] overflow-auto w-full p-5'>


{loading ? 


<div className='flex flex-col gap-10 items-center justify-center'>


<div className='grid grid-cols-2 gap-10'>

  <InstructorCardSkeleton/>
  <InstructorCardSkeleton/>
 
  </div>


<div className='grid grid-cols-2 gap-10'>
 
  <InstructorCardSkeleton/>
  <InstructorCardSkeleton/>
 
</div>





</div>

:
<> 


    { userRatings ?  <div className='grid grid-cols-2 gap-8'>  
      {instructorRatings?.map(val => (
      <Card onClick={() => {
        setInstructorId(val.id)
        setUserRatings(false)
        }} key={val.id} className="w-[450px] cursor-pointer hover:bg-[#bababa]">
         <CardHeader>
         <CardTitle>{val.name}</CardTitle>
         <CardDescription><strong>Position:</strong> {val.field}</CardDescription>
         <CardDescription><strong>Email:</strong> {val.email}</CardDescription>
       </CardHeader>
       <CardContent>
        <h2><strong>Rate by :</strong> {val.userRatingCount} {val.userRatingCount === 1 ? "user" : "users"}</h2>
        

        <div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rating1">Rating 1 - {handleRatingRange(val.ratings["1"],val.userRatingCount)}%</label>
            <Progress className='rounded h-2'   value={handleRatingRange(val.ratings["1"],val.userRatingCount)} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rating1">Rating 2 - {handleRatingRange(val.ratings["2"],val.userRatingCount)}%</label>
            <Progress className='rounded h-2'  value={handleRatingRange(val.ratings["2"],val.userRatingCount)} />
          </div>


          <div className="flex flex-col gap-2">
            <label htmlFor="rating1">Rating 3 -{handleRatingRange(val.ratings["3"],val.userRatingCount)}%</label>
            <Progress className='rounded h-2'  value={handleRatingRange(val.ratings["3"],val.userRatingCount)} />
          </div>


          <div className="flex flex-col gap-2">
            <label htmlFor="rating1">Rating 4 - {handleRatingRange(val.ratings["4"],val.userRatingCount)}%</label>
            <Progress className='rounded h-2'  value={handleRatingRange(val.ratings["4"],val.userRatingCount)} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rating1">Rating 5 - {handleRatingRange(val.ratings["5"],val.userRatingCount)}%</label>
            <Progress className='rounded h-2'  value={handleRatingRange(val.ratings["5"],val.userRatingCount)} />
          </div>


        </div>



          <div>

          </div>
       </CardContent>
       <CardFooter className="flex justify-between">
       
       </CardFooter>
     </Card>
   
      ))
     }

      </div>
      : 
      
      <div className='w-full  h-full'>

          <h2 className=' mb-8 text-2xl font-bold flex items-center gap-5' > <button onClick={() => setUserRatings(true)}><IoMdArrowRoundBack /></button> Student's Ratings</h2>

          {userRatingLoading ? <div>
              <h2>Loading...</h2>
          </div> 
          
        
          : 
          <div className='grid grid-cols-2 gap-10 '>


            {allUserRatings.map(val =>  <Card key={val.id} className="w-[450px] cursor-pointer hover:bg-[#bababa]">
       
        

         {val.user == null ?   <>
        
          <CardHeader>
          <CardContent>
            
            <span>User is not longer available</span>
          </CardContent>
          </CardHeader>

          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 1</span>
                <Progress className='rounded h-2'  value={val.rate1 * 25} />
              </div>
          </CardContent>


          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 2</span>
                <Progress className='rounded h-2'  value={val.rate2 * 25} />
              </div>
          </CardContent>



          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 3</span>
                <Progress className='rounded h-2'  value={val.rate3 * 25} />
              </div>
          </CardContent>



          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 4</span>
                <Progress className='rounded h-2'  value={val.rate4 * 25} />
              </div>
          </CardContent>




          <CardFooter className="flex justify-between">
          
          </CardFooter> 
          </>
          : 
         <>
           <CardHeader>
          <CardTitle>{val.user.name}</CardTitle> 
          <CardDescription><strong>Email:</strong> {val.user.email}</CardDescription>
          </CardHeader>

          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 1</span>
                <Progress className='rounded h-2'  value={val.rate1 * 25} />
              </div>
          </CardContent>


          <CardContent> 
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 2</span>
                <Progress className='rounded h-2'  value={val.rate2 * 25} />
              </div>
          </CardContent>



          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 3</span>
                <Progress className='rounded h-2 '  value={val.rate3 * 25} />
              </div>
          </CardContent>



          <CardContent>
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>Rating 4</span>
                <Progress className='rounded h-2'  value={val.rate4 * 25} />
              </div>
          </CardContent>


          <CardFooter className="flex justify-between">
          
          </CardFooter>
          </>
         }
        
       
       
     </Card>)}
            
          </div>
            
            
            }

      </div>
       
     }

  </>

    }
   
     </div>
  )
}

export default InstructorsPage