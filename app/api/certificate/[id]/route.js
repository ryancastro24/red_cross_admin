import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'





export async function PATCH(req,{params}){


    const updateUser = await prisma.userInfo.update({
        where:{
            id: params.id
        },
        data:{
            certificatedApproved:true
        }
    })

    return NextResponse.json({message:"update success"});
}