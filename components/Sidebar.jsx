'use client'

import {useState,useContext} from 'react'
import Image from 'next/image'
import { FaUser } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { SideNavigationProvider } from './SideNavigationProvider';
const Sidebar = () => {

  const navigation = useContext(SideNavigationProvider)


  return (
    <div className='w-[250px] h-screen bg-[#eeeded] p-5'>
        
        <div className='flex items-center justify-center gap-2'>
            <Image src={'/assets/white logo.png'} width={45} height={45}/>
            <h2 className=' text-xl font-bold'>RED CROSS</h2>
        </div>



        <ul className='flex flex-col gap-5 items-center mt-10'>
            <li onClick={() => navigation.setNavigation("form")} className={`text-[#141313] ${navigation.navigation === "form" ? "bg-red-500 text-white font-bold" : ""} flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}><FaUser/> ADD TRAINEE</li>
            <li onClick={() => navigation.setNavigation("list")} className={`text-[#141313] ${navigation.navigation === "list" ? "bg-red-500 text-white font-bold" : ""} flex items-center px-4 py-3 cursor-pointer rounded text-sm gap-2 w-full`}><IoPeople/> LIST OF TRAINEES</li>
        </ul>


        
    </div>
  )
}

export default Sidebar