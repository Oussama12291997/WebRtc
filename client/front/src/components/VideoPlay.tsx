import React, { useEffect, useRef } from 'react'

const VideoPlay:React.FC<{stream:MediaStream}>= ({stream}) => {
    const videoRef=useRef<HTMLVideoElement>(null)

    useEffect(()=>{
        if(videoRef.current) videoRef.current.srcObject=stream
    },[stream])
  return (
    <div >
        <video  ref={videoRef} autoPlay/>
    </div> 
  )
}

export default VideoPlay