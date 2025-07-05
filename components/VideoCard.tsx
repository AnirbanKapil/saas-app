import React, { useCallback, useState } from 'react'
import {getCldImageUrl,getCldVideoUrl} from "next-cloudinary"
import { Download , Clock , FileDown , FileUp } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import fileSize from "filesize"
import { Video } from '@/generated/prisma'
import { auth } from '@clerk/nextjs/server'
import { Autour_One } from 'next/font/google'


interface VideoCardProps {
  video : Video;
  onDownload : (url : string , title : string) => void
}


dayjs.extend(relativeTime)

const VideoCard : React.FC<VideoCardProps>  = ({video , onDownload}) => {

  const [isHovered , setIsHover] = useState(false)
  const [previewError,setPreviewError] = useState(false)

  const getThumbnailUrl = useCallback((publicId : string)=>{
        return getCldImageUrl({
          src : publicId,
          width : 400,
          height : 225,
          crop : Fill,
          gravity : "auto",
          format : "jpg",
          quality : "auto",
          assetType : "video"
        })
  },[])

   const getFullVideoUrl = useCallback((publicId : string)=>{
        return getCldVideoUrl({
          src : publicId,
          width : 1920,
          height : 1080,
       
        })
  },[])

  const getPreviewVideoUrl = useCallback((publicId : string)=>{
        return getCldVideoUrl({
          src : publicId,
          width : 400,
          height : 225,
          rawTransformations : ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
        })
  },[])

  const formatSize = useCallback((size : number)=>{
      return fileSize(size)
  },[])

  return (
    <div>VideoCard</div>
  )
}

export default VideoCard