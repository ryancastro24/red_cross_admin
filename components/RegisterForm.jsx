'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { UploadButton } from "../app/utils/uploadthing";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MdCloudDownload } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import DatePicker from './DatePicker';

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
    certificateUrl:"",
    gender:""
});


const [date,setDate] = useState("");


const convertedDate = new Date(date);

// Extract the month, day, and year
const month = String(convertedDate.getMonth() + 1).padStart(2, '0');
const day = String(convertedDate.getDate()).padStart(2, '0');
const year = String(convertedDate.getFullYear()).slice(-2);

// Format the date as MM-DD-YY
const formattedDate = `${month}-${day}-${year}`;




const handleAddressChange = (value) => {
  setUserData({...userData,address:value});
};


const handleGenderChange = (value) => {
  setUserData({...userData,gender:value});
};


const handleCategoryChange = (value) => {
  setUserData({...userData,category:value});
};



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
        



        await axios.post('/api/register',{...userData,dateStarted:formattedDate})
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
          <h2 style={{ fontSize: '2em', margin: '20px 0' }}>{userData.name.toUpperCase() || 'Your Name Here'}</h2>
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
        
       
        <form onSubmit={handleSubmit} className=' h-full w-full rounded p-5 grid grid-cols-2  gap-6 ' action="">
          <h2 className='text-[#100f0f] text-2xl col-span-2'>Enroll Trainee</h2>

            <Input
            value={userData.orNumber} 
            onChange={(e) => setUserData({...userData,orNumber:e.target.value})} 
            placeholder='Enter Or Number'
            />

            <Input
            value={userData.name} 
            onChange={(e) => setUserData({...userData,name:e.target.value})} 
            placeholder='Enter Fullname'
            />



<div className='flex items-center gap-2'>
            <Input
            value={userData.email} 
            onChange={(e) => setUserData({...userData,email:e.target.value})} 
            placeholder='Enter Email'
            />    


            
         { !update &&  
          <Input
          value={userData.password} 
          onChange={(e) => setUserData({...userData,password:e.target.value})} 
          placeholder='Enter Password'
          type="password"
         />    
  }

  </div>



    <div className='flex items-center gap-2'>

             <Select onValueChange={handleAddressChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manila">Manila</SelectItem>
                <SelectItem value="Cavite">Cavite</SelectItem>
                <SelectItem value="Pasay">Pasay</SelectItem>
              </SelectContent>
            </Select>



            <DatePicker date={date} setDate={setDate}/>
      
    </div>

          
    <div className='flex items-center gap-2'>
              
              <Input
              value={userData.contact} 
              onChange={(e) => setUserData({...userData,contact:e.target.value})} 
              placeholder='Enter Contact Number'
              />    


            <Select onValueChange={handleGenderChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>


      </div>


            <div className='flex items-center gap-2'>

        


            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="occupational">Occupational</SelectItem>
              </SelectContent>
            </Select>


          <Button  asChild>
            <button type='button' className='text-xl w-[90px] ' onClick={ handleDownload} ><MdCloudDownload/></button>
          </Button>
           
            </div>


      




        <UploadButton
        endpoint="imageUploader"
        appearance={{
          button: {
            padding: "2rem",
            color: "#000",
            border: "0.1px solid gray"
          }
        }}
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
            
          <Button asChild>
            <button disabled={
            !userData.orNumber ||
            !userData.name || 
            !userData.email || 
            !userData.password || 
            !userData.address || 
            !userData.contact || 
            !userData.category
          } 
          onClick={() => setLoading(true)} className='w-full cursor-pointer col-span-2 py-3 h-16  px-3 rounded bg-red-600 hover:bg-red-800 text-white'>{ update ? "update" : loading ? "Adding Trainee..." :"Add Trainee"}
          </button>
          </Button>
         
          
           
        </form>
    </>
  )
}

export default RegisterForm