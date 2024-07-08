'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { UploadButton } from "../app/utils/uploadthing";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdCloudDownload } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = ({loading,setLoading,update,setUpdate,navigationDataChange}) => {

  
    
  const [userData,setUserData] = useState({
    name:"",
    orNumber:"",
    email:"",
    password:"",
    address:"",
    contact:"",
    category:"",
    dateStarted:"",
    profilePictureUrl:"",
    certificateUrl:""
});




const handleDownload = (e) => {

  e.stopPropagation();
  const input = document.getElementById('certificate');

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'letter');
    pdf.addImage(imgData, 'PNG', 20, 20, 770, 570);
    pdf.save(`${userData.name}.pdf`);
  });



};
    




    const handleSubmit = async(e) => {

        e.preventDefault();
        



        await axios.post('/api/register',userData)
                   .then(() => {

                    toast('Trainee Has Been Added', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });

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

      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />

<div
        id="certificate"
        style={{
          width: '770px',
          height: '570px',
          margin: '0 auto',
          padding: '20px',
          border: '10px solid #ddd',
          boxShadow: '0 0 20px rgba(0,0,0,0.15)',
          textAlign: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          fontFamily: 'serif',
          top:-1000
        }}
      >
        <div
          style={{
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 40px)',
            border: '5px solid #aaa',
            padding: '20px',
            position: 'absolute',
            top: '20px',
            left: '20px',
            boxSizing: 'border-box',
          }}
        >
          <h1 style={{ fontSize: '2.5em', margin: '0' }}>Certificate of Achievement</h1>
          <p style={{ fontSize: '1.25em', marginTop: '40px' }}>This certifies that</p>
          <h2 style={{ fontSize: '2em', margin: '20px 0' }}>{userData.name || 'Your Name Here'}</h2>
          <p style={{ fontSize: '1.25em' }}>has successfully completed the course</p>
          <p style={{ fontSize: '1.5em', fontStyle: 'italic', margin: '40px 0' }}>Red Cross Cavite Graduate</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px' }}>
            <div>
              <p>__________________________</p>
              <p>Dr. Juan Dela Cruz</p>
            </div>
            <div>
              <p>__________________________</p>
              <p>Dr. Jane Doe</p>
            </div>
          </div>
        </div>
      </div>
        
       
        <form onSubmit={handleSubmit} className='border-[0.5px] h-full w-full rounded p-5 grid grid-cols-2  gap-6 ' action="">
          <h2 className='text-[#100f0f] col-span-2'>Enroll Trainee</h2>
            <input value={userData.orNumber} onChange={(e) => setUserData({...userData,orNumber:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Or Number' />
            <input value={userData.name} onChange={(e) => setUserData({...userData,name:e.target.value})} className='w-full outline-red-500 rounded-s py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Name' />
            <input value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="email" placeholder='Enter Email' />
         { !update &&  <input value={userData?.password} onChange={(e) => setUserData({...userData,password:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="password" placeholder='Enter Password' /> }
            <input value={userData.address} onChange={(e) => setUserData({...userData,address:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Address' />
            <input value={userData.contact} onChange={(e) => setUserData({...userData,contact:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Contact Number' />
            
            <div className='flex items-center'>
            <select value={userData.category} onChange={(e) => setUserData({...userData,category:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="text" placeholder='Enter Contact Number'>
              <option value="">Select Category</option>
              <option value="standard">Standard</option>
              <option value="occupational">Occupational</option>
            </select>
            <button type='button' onClick={ handleDownload} className='px-3 py-2 rounded h-full text-2xl bg-[#949393] text-white'><MdCloudDownload/></button>
            </div>


            <input value={userData.dateStarted} onChange={(e) => setUserData({...userData,dateStarted:e.target.value})} className='w-full outline-red-500 rounded py-3 px-3 h-16 bg-[#D9D9D9]' type="date" placeholder='Enter Contact Number' />
        
        
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          setUserData({
            ...userData,
            profilePictureUrl:res[0].url
          })
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
            

            <UploadButton
        endpoint="pdfUploader"
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
            
            
            <button disabled={
            userData.name === "" &&
            userData.email === "" &&
            userData.password === "" &&
            userData.address === "" &&
            userData.contact === "" &&
            userData.category === ""
          } 
          onClick={() => setLoading(true)} className='w-full col-span-2 py-3 px-3 rounded bg-[#ff0000] hover:bg-[#a82424] text-white'>{ update ? "update" : loading ? "Adding Trainee..." :"Add Trainee"}</button>
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