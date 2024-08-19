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

import { Button } from "@/components/ui/button"
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
                <li><strong>Email:</strong> {email}</li>
                <li><strong>Gender:</strong> {gender}</li>
                <li><strong>Category:</strong> {category}</li>
                <li><strong>Address:</strong> {address}</li>
                <li><strong>OR Number:</strong> {orNumber}</li>
                <li><strong>Contact Number:</strong> {contact}</li>
            </ul>

        <div>


        
        </div>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default UserDetailsModal