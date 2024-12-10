import React, { useEffect, useRef } from 'react'

const VideoPlay:React.FC<{stream:MediaStream}>= ({stream}) => {
    const videoRef=useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        if(videoRef.current) videoRef.current.srcObject=stream
    },[stream])
  return (
    <div >
        <video  ref={videoRef} autoPlay poster='https://images.unsplash.com/photo-1721332149274-586f2604884d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8'/>
    </div> 
  )
}

export default VideoPlay