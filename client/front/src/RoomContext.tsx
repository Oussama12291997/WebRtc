import Peer from "peerjs"
import React, { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import {io} from "socket.io-client"
import { v4 as uuidv4 } from "uuid"
import { peersReducer } from "./peerReducer"
import { addPeerAction, removePeerAction } from "./PeerActions"

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


  const removePeer=(peerId:string)=>{
        dispatch(removePeerAction(peerId))
  }
  const getUsers=({participants}: {participants:string[]})=>{
    return {participants}
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
      console.error(error)
    }

    ws.on("room-created",enterRoom)
    ws.on("get-users",getUsers)
    ws.on("user-disconnected",removePeer)

  },[])


  useEffect(()=>{
    if(!me) return
    if(!stream) return
    ws.on("user-joined",({peerId})=>{
      console.log("user-joined")
      const call=me.call(peerId,stream);
      console.log(call)
      call.on("stream",(peerStream)=>{
          dispatch(addPeerAction(peerId,peerStream))
          console.log(peers,"peer from user-joind")
      })
    })


    me.on("call",(call)=>{
      console.log("me call")

      call.answer(stream)
      call.on("stream",(peerStream)=>{
        dispatch(addPeerAction(call.peer,peerStream))
      })
    })


  },[me,stream])
  console.log(peers, 'peers bro')
  return (
    <RoomContext.Provider value={{ ws ,me,stream,peers}}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext