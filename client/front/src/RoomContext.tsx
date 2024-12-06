import Peer from "peerjs"
import React, { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"
import { v4 as uuidv4 } from "uuid"
import { peersReducer } from "./peerReducer"

const WS = "http://127.0.0.1:8080/"
const RoomContext = createContext<any | null>(null)
const ws = io(WS)

interface RoomProviderProps {
  children: ReactNode
}
export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  let navigate=useNavigate()
  const [me,setMe]=useState<Peer>()
  const [stream,setStream]=useState<MediaStream>()

  const [peers,dispatch]=useReducer(peersReducer,{})

  const enterRoom=({roomId}:{roomId:string})=>{
      //console.log({roomId})
      navigate(`/Room/${roomId}`)
  }
  const getUsers=({participants}: {participants:string[]})=>{
    console.log({participants})
  }
  useEffect(()=>{
    const meId=uuidv4()
    const peer =new Peer(meId)
    console.log("-----------------------------------")

    setMe(peer)

    try{
              navigator.mediaDevices.getUserMedia({video:true,audio:true})
              .then((stream)=>{
                setStream(stream)
              })
    }catch(error){
      console.log(error)
    }

    ws.on("room-created",enterRoom)
    ws.on("get-users",getUsers)
  },[])
  return (
    <RoomContext.Provider value={{ ws ,me,stream}}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext