import React, { createContext, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"

const WS = "http://127.0.0.1:8080/"
const RoomContext = createContext<any | null>(null)
const ws = io(WS)

interface RoomProviderProps {
  children: ReactNode
}
export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  let navigate=useNavigate()
  const enterRoom=({roomId}:{roomId:string})=>{
      console.log({roomId})
      navigate(`/Room/${roomId}`)
  }
  useEffect(()=>{
    ws.on("room-created",enterRoom)
  })
  return (
    <RoomContext.Provider value={{ ws }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext