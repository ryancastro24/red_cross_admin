'use client'
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
const RegisterForm = ({userData,setUserData,loading,setLoading,update,setUpdate}) => {

  
    
   
    
    const handleSubmit = async(e) => {

        e.preventDefault();
        


        if(update){
            
           const res = await axios.patch(`/api/user/${userData.id}`,userData);
            alert(res.data.message);
            setUpdate(false);
            setUserData({
                name:"",
                email:"",
                password:"",
                address:"",
                contact:""
            })

        }

        else {
        await axios.post('/api/register',userData)
                   .then(() => {
                        alert("data has been saved!");
                        setLoading(false);
                        setUserData({
                            name:"",
                            email:"",
                            password:"",
                            address:"",
                            contact:""
                        })

                        
                   })
                   .catch((error) => {
                        alert("an error occur")
                        setUserData({
                            name:"",
                            email:"",
                            password:"",
                            address:"",
                            contact:""
                        })


                        setLoading(false);
                        
                   } )
        }
    }
  return (
    <>
        
        <form onSubmit={handleSubmit} className='border-[0.5px] h-full justify-center items-center w-full rounded border-black border-opacity-30 p-5 flex flex-col gap-6 ' action="">
             <h2 className='text-xl font-bold'>Enroll Trainee</h2>
            <input value={userData?.name} onChange={(e) => setUserData({...userData,name:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 bg-[#D9D9D9]' type="text" placeholder='Enter Name' />
            <input value={userData?.email} onChange={(e) => setUserData({...userData,email:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 bg-[#D9D9D9]' type="email" placeholder='Enter Email' />
         { !update &&  <input value={userData?.password} onChange={(e) => setUserData({...userData,password:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 bg-[#D9D9D9]' type="password" placeholder='Enter Password' /> }
            <input value={userData?.address} onChange={(e) => setUserData({...userData,address:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 bg-[#D9D9D9]' type="text" placeholder='Enter Address' />
            <input value={userData?.contact} onChange={(e) => setUserData({...userData,contact:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 bg-[#D9D9D9]' type="text" placeholder='Enter Contact Number' />
            <button onClick={() => setLoading(true)} className='w-full py-3 px-3 rounded bg-[#B00909] text-white'>{ update ? "update" : loading ? "Adding Trainee..." :"Add Trainee"}</button>
         {update  &&  <button type='button' onClick={() => {
                setUpdate(false);
                setUserData({
                    name:"",
                    email:"",
                    password:"",
                    address:"",
                    contact:""
                })
            }} className='w-full py-3 px-3 rounded bg-[#3c3b3b] text-white'>Cancel</button> }
           
        </form>
    </>
  )
}

export default RegisterForm