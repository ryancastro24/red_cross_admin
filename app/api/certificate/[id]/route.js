import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'





export async function PATCH(req,{params}){



    const {formattedDate} = await req.json();


    // const updateUser = await prisma.userInfo.update({
    //     where:{
    //         id: params.id
    //     },
    //     data:{
    //         certificatedApproved:true,
    //         dateEnded: formattedDate
    //     }
    // })

    return NextResponse.json({message:"update success"});
}