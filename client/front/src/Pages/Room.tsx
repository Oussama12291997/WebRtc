import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'
import VideoPlay from '../components/VideoPlay'

const Room = () => {
    const {id}=useParams()
    const {ws,me,stream}=useContext(RoomContext)
    useEffect(()=>{
       if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
    },[id,ws,me])
  return (
    <div>
        <h1>Room {id}</h1>
          <VideoPlay stream={stream} />
        </div>
  )
}

export default Room