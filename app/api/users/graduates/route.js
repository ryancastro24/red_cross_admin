import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'





export async function PATCH(req,{params}){



    const { formattedDate, userIds } = await req.json();

    console.log(formattedDate);
    console.log(userIds);
    
    const updateUsers = await prisma.userInfo.updateMany({
        where: {
            id: {
                in: userIds
            }
        },
        data: {
            certificatedApproved: true,
            dateEnded: formattedDate
        }
    });
    
    console.log(updateUsers);

    return NextResponse.json({message:"update success"});
}