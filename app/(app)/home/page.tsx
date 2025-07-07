"use client"
import axios from "axios"
import VideoCard from "@/components/VideoCard"
import { useCallback, useEffect, useState } from "react"
import { Video } from "@/types"




function Home() {
  
  const [video,setVideo] = useState<Video[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  const fetchVideos = useCallback(async ()=>{
    try {
      const response = await axios.get("/api/videos")
      if(Array.isArray(response.data)){
        setVideo(response.data)
      }else{
        throw new Error("Unexpected response format")
      }
    } catch (error) {
      console.log(error);
            setError("Failed to fetch videos")
    } finally {
            setLoading(false)
    }         
  },[])

  useEffect(()=>{
    fetchVideos()
  },[fetchVideos])

 const handleDownload = useCallback((url : string)=>{
    const link = document.createElement("a")
    link.href = url
    link.download = "image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)

 },[])

 if(loading){
  return <div>Loading.....</div>
 }

  return (
    <div>Home</div>
  )
}

export default Home