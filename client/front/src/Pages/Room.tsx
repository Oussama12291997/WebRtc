import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'

const Room = () => {
    const {id}=useParams()
    const {ws,me}=useContext(RoomContext)
    useEffect(()=>{
       if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
    },[id,ws,me])
  return (
    <div>
        <h1>Room {id}</h1>
        </div>
  )
}

export default Room