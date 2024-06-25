'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { UploadButton } from "../app/utils/uploadthing";
const RegisterForm = ({loading,setLoading,update,setUpdate,navigationDataChange}) => {

  
    
  const [userData,setUserData] = useState({
    name:"",
    email:"",
    password:"",
    address:"",
    contact:"",
    category:"",
    dateStarted:""
});

    
    const handleSubmit = async(e) => {

        e.preventDefault();
        



        await axios.post('/api/register',userData)
                   .then(() => {
                        alert("data has been saved!");
                        setLoading(false);
                        setUserData({
                            name:"",
                            email:"",
                            password:"",
                            address:"",
                            contact:"",
                        })

                        navigationDataChange("list")

                        
                   })
                   .catch((error) => {
                        alert(error.message)
                        setUserData({
                            name:"",
                            email:"",
                            password:"",
                            address:"",
                            contact:"",

                        })


                        setLoading(false);
                        
                   } )
    
    }
  return (
    <>
        
       
        <form onSubmit={handleSubmit} className='border-[0.5px] h-full w-full rounded p-5 grid grid-cols-2  gap-6 ' action="">
          <h2 className='text-[#100f0f] col-span-2'>Enroll Trainee</h2>
            <input value={userData.name} onChange={(e) => setUserData({...userData,name:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Name' />
            <input value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="email" placeholder='Enter Email' />
         { !update &&  <input value={userData?.password} onChange={(e) => setUserData({...userData,password:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="password" placeholder='Enter Password' /> }
            <input value={userData.address} onChange={(e) => setUserData({...userData,address:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Address' />
            <input value={userData.contact} onChange={(e) => setUserData({...userData,contact:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Contact Number' />
            <select value={userData.category} onChange={(e) => setUserData({...userData,category:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Contact Number'>
              <option value="">Select Category</option>
              <option value="standard">Standard</option>
              <option value="occupational">Occupational</option>
            </select>


            <input value={userData.dateStarted} onChange={(e) => setUserData({...userData,dateStarted:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="date" placeholder='Enter Contact Number' />
            <UploadButton
        endpoint="imageUploader"
        
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          setUserData({
            ...userData,
            certificateUrl:res[0].url
          })
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
            
            
            <button onClick={() => setLoading(true)} className='w-full col-span-2 py-3 px-3 rounded bg-[#ff0000] hover:bg-[#a82424] text-white'>{ update ? "update" : loading ? "Adding Trainee..." :"Add Trainee"}</button>
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