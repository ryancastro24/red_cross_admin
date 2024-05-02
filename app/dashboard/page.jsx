'use client'

import { useState,useEffect } from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/RegisterForm'
import DataTable from '@/components/DataTable'
import axios from 'axios'
import { useSession, signOut} from 'next-auth/react'



const Dashboard = () => {


    const {data:session}  = useSession();


    const [searchData,setSearchData] = useState('');


    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:"",
        address:"",
        contact:""
    });

   

    const [loading,setLoading] = useState(false);
    const [update,setUpdate] = useState(false);
    const [updateId,setUpdateId] = useState('');


    const [users,setUsers] = useState([]);

    const handleDelete = async(id) => {

        await axios.delete(`/api/user/${id}`)
                    .then(() => {
                        alert("data has beeen deleted!")
                    })
                    .catch((e) => alert(e.message))
      
    }

   
    useEffect(() => {

        const getUsers = async () => {
            try {
                const usersData = await axios.get('/api/user');
                const data = usersData.data;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    
        getUsers();
        
    }, [users]);
    



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
    


    const notAdminUsers = users.filter(val => val.userType !== "admin");



    const finalUsers =  notAdminUsers.filter(val => {
        const lowercaseSearch = searchData.toLowerCase();
        // Check if the name or any other data fields contain the search query
        return Object.values(val).some(field =>
            typeof field === 'string' && field.toLowerCase().includes(lowercaseSearch)
        );
    }); 




  return (

    <div className=''>

        <div className='w-full h-full bg-[#0C0B0B] pt-5 flex justify-between'>

            <div className='w-1/3 h-full flex flex-col gap-5  p-3  '>

            <div className='flex items-center gap-2'>

                <div className='bg-white rounded-full'>
                    <Image src={"/assets/logo.png"} width={50} height={50} alt='logo' />
                </div>

                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold text-white'>Red Cross</h2>
                    <h2 className='text-sm text-white'>Cavite City</h2>
                </div>
            </div>
                <RegisterForm updateId={updateId} update={update} setUpdate={setUpdate} loading={loading} setLoading={setLoading} userData={userData} setUserData={setUserData}/>
            </div>




            <div className='w-2/3 h-full  flex flex-col gap-3 p-3'>

                 
                 <div className='flex items-center h-full justify-between gap-4'>
                
                     <input value={searchData} onChange={(e) => setSearchData(e.target.value)} type="text" placeholder='Search...' className='px-3 py-2 rounded  w-[350px] outline-none' />
                        <div className='flex items-center gap-5'>
                            <h2 className='text-white'>{session?.user.name}</h2>
                            <button onClick={signOut} className='bg-red-500 px-3 py-2 rounded text-white'>Logout</button>
                        </div>
                        
                </div>

                   
                <div className='bg-[#211e1e] h-[530px] overflow-y-auto w-full rounded-md overflow-hidden '>

                      <DataTable handleDelete={handleDelete} users={finalUsers} setUpdateId={setUpdateId} setUpdate={setUpdate}/>
                </div>
            </div>
                
        </div>
</div>
  )
}



export default Dashboard