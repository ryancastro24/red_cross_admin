'use client'

import { useState,useEffect,useContext } from 'react'
import Image from 'next/image'
import RegisterForm from '@/components/RegisterForm'
import DataTable from '@/components/DataTable'
import axios from 'axios'
import { useSession, signOut} from 'next-auth/react'
import Link from 'next/link'
import { RiUploadCloud2Fill } from "react-icons/ri";
import { SideNavigationProvider } from '@/components/SideNavigationProvider'
const Dashboard = () => {


    const {data:session}  = useSession();
    const navigationData = useContext(SideNavigationProvider)

    const [searchData,setSearchData] = useState('');
    const [unlockCertificate,setUnlockCertificate] = useState(false);
 
   

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


    const handleUnlockCertificate = async(id) => {

        await axios.patch(`/api/certificate/${id}`)
                    .then(() => {
                        alert("user certificate has been unlock!")
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

    }, [updateId]); // assuming updateId is a dependency
    


    const notAdminUsers = users.filter(val => val.userType !== "admin");



    const finalUsers =  notAdminUsers.filter(val => {
        const lowercaseSearch = searchData.toLowerCase();
        // Check if the name or any other data fields contain the search query
        return Object.values(val).some(field =>
            typeof field === 'string' && field.toLowerCase().includes(lowercaseSearch)
        );
    }); 




  return (
    <div className='flex justify-center items-center w-full bg-white h-full'>


        {navigationData.navigation === "form" && <RegisterForm update={update} setUpdate={setUpdate} navigationDataChange={navigationData.setNavigation}  loading={loading} setLoading={setLoading} />}
        {navigationData.navigation === "list" && <DataTable users={users} handleDelete={handleDelete}/>}
    
    </div>


  )
}



export default Dashboard