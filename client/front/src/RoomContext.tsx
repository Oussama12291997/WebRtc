import Peer from "peerjs"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"
import { v4 as uuidv4 } from "uuid"
const WS = "http://127.0.0.1:8080/"
const RoomContext = createContext<any | null>(null)
const ws = io(WS)

interface RoomProviderProps {
  children: ReactNode
}
export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  let navigate=useNavigate()
  const [me,setMe]=useState<Peer>()
  const enterRoom=({roomId}:{roomId:string})=>{
      console.log({roomId})
      navigate(`/Room/${roomId}`)
  }
  useEffect(()=>{
    const meId=uuidv4()
    const peer =new Peer(meId)
    setMe(peer)
    ws.on("room-created",enterRoom)
  })
  return (
    <RoomContext.Provider value={{ ws ,me}}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext