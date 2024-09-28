import { NextResponse } from "next/server";
import prisma from '@/libs/prismaDB'

export async function GET(req,{params}) {
    

    const {id} = params;

    const userRatings = await prisma.ratings.findMany({
        where:{
            instructorId: id
        },
        include:{
         user:true
        }
    })


    if(!userRatings) {
        return NextResponse.json({message:"no user ratings available"});
    }


    return NextResponse.json(userRatings);
}
