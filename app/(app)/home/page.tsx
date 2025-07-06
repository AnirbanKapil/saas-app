"use client"
import axios from "axios"
import VideoCard from "@/components/VideoCard"
import { useCallback, useState } from "react"
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
      }
    } catch (error) {
      console.log(error);
            setError("Failed to fetch videos")
    } finally {
            setLoading(false)
    }         
  },[])

  return (
    <div>Home</div>
  )
}

export default Home