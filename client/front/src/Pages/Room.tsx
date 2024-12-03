import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'

const Room = () => {
    const {id}=useParams()
    const {ws}=useContext(RoomContext)
    useEffect(()=>{
        ws.emit("join-room",{roomId:id})
    },[id])
  return (
    <div>Room {id}</div>
  )
}

export default Room