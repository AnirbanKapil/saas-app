import { v2 as cloudinary } from 'cloudinary';
import { NextRequest , NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient()

cloudinary.config({ 
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


interface CloudinaryUploadResult {
    public_id : string;
    bytes : number;
    duration? : number;
    [key : string] : any
}


export async function POST (request : NextRequest) {
      
     try {

        const {userId} = await auth()

       if(!userId){
        return NextResponse.json({error : "unauthorized"},{status:401})
       }

       if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
       ){
        return NextResponse.json({error : "Cloudinary credentials not found"},{status : 500})
       }  
        
        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const title = formData.get("title") as string
        const description = formData.get("descripton") as string
        const originalSize = formData.get("originalSize") as string

        if(!file){
          return NextResponse.json({error : "File not found"},{status : 400})  
        } 

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
             (resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder : "saas-app-uploads"},
                    (error,result)=>{
                        if(error) reject(error)
                        else resolve(result as CloudinaryUploadResult)    
                    }
                )
                uploadStream.end(buffer)
             }
        )

        return NextResponse.json({publicId : result.public_id},{status : 200})

     } catch (error) {
        console.log("Error uploading image error---- ",error)
        return NextResponse.json({error : "Upload image failed"},{status : 500})
     }
}
