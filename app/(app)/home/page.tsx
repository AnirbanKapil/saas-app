"use client"
import axios from "axios"
import VideoCard from "@/components/VideoCard"
import { useCallback, useEffect, useState } from "react"
import { Video } from "@/types"




function Home() {
  
  const [video,setVideo] = useState<Video[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {video.length === 0 ? (<div className="text-center text-lg text-gray-500">No videos available</div>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {video.map((video)=>(
             <VideoCard key={video.id} onDownload={handleDownload} video={video}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home