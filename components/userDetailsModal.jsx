'use client'
import React from 'react'
import Image from 'next/image'

import { GrView } from "react-icons/gr";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"


const UserDetailsModal = ({name,email,gender,category,orNumber,address,contact,id}) => {
  return (
    <Dialog>
    <DialogTrigger className="text-lg"><GrView/></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className={'text-2xl'}>{name}</DialogTitle>
      </DialogHeader>

      <div className='flex items-center gap-5'>

        <div className='w-44 h-44 rounded bg-[#dadada]'></div>
            <ul className='flex flex-col gap-1'>
                <li className='text-sm truncate'><strong>Email:</strong> {email}</li>
                <li className='text-sm truncate'><strong>Gender:</strong> {gender}</li>
                <li className='text-sm truncate'><strong>Category:</strong> {category}</li>
                <li className='text-sm truncate'><strong>Address:</strong> {address}</li>
                <li className='text-sm truncate'><strong>OR Number:</strong> {orNumber}</li>
                <li className='text-sm truncate'><strong>Contact Number:</strong> {contact}</li>
            </ul>

        <div>


        
        </div>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default UserDetailsModal