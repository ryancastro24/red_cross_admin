'use client'
import { useState,useEffect } from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/RegisterForm'
import DataTable from '@/components/DataTable'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
const Dashboard = () => {


    const {data:session}  = useSession();


    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        contact:""
    })

   

    const [loading,setLoading] = useState(false);
    const [update,setUpdate] = useState(false);
    const [updateId,setUpdateId] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.get(`/api/user/${updateId}`);
                const finalRes = await res.data;
    
                console.log(finalRes);
    
                setUserData(finalRes);
            } catch (error) {
                // Handle errors, if any
                console.error('Error fetching user data:', error);
            }
        };
    
        getUserData();
    }, [updateId, setUserData]); // assuming updateId is a dependency
    

    


  return (
    <div className='w-full h-screen p-5 flex flex-col justify-between '>
        <nav className='flex items-center justify-between gap-2 w-full'>

            <div className='flex items-center gap-2'>
                <Image src={"/assets/logo.png"} width={50} height={50} alt='logo' />

                <h2 className='text-2xl font-bold'>Red Cross Cavite</h2>
            </div>
            
            <div className='flex items-center gap-4'>
                <h2>{session?.user.name}</h2>
                <button onClick={signOut} className='bg-red-500 px-3 py-2 rounded text-white'>Logout</button>
            </div>
        </nav>



        <div className='w-full h-full  flex justify-center items-center'>

            <div className='w-1/3 h-full  p-8  '>
                <RegisterForm updateId={updateId} update={update} setUpdate={setUpdate} loading={loading} setLoading={setLoading} userData={userData} setUserData={setUserData}/>
            </div>
            <div className='w-2/3 h-full  p-3'>
                <div className='border-[1px] border-black border-opacity-45 h-full w-full rounded '>
                      <DataTable setUpdateId={setUpdateId} setUpdate={setUpdate}/>
                </div>
            </div>
                
        </div>
    </div>    
  )
}

export default Dashboard