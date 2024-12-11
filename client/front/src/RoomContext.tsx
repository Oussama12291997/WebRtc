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
  const [roomId,setRoamId]=useState<string>()
  const [screenSharingId,setSharingId]=useState<string>()
  const enterRoom=({roomId}:{roomId:string})=>{
      //console.log({roomId})
      navigate(`/Room/${roomId}`)
  }

  const switchStream = (stream: MediaStream) => {
    setStream(stream);
    setSharingId(me?.id || "");
    // Iterate through actual connections, not just connection keys
    Object.values(me?.connections || {}).forEach((connections: any) => {
      connections.forEach((conn: any) => {
        try {
          // Ensure the connection and peerConnection exist
          if (conn && conn.peerConnection) {
            const videoTrack = stream?.getTracks().find(track => track.kind === "video");
            
            // Find the video sender and replace the track
            const videoSender = conn.peerConnection.getSenders().find(
              (sender: any) => sender.track && sender.track.kind === "video"
            );
  
            if (videoSender && videoTrack) {
              videoSender.replaceTrack(videoTrack)
                .catch((error: any) => console.error("Error replacing track:", error));
            }
          }
        } catch (error) {
          console.error("Error in stream switching:", error);
        }
      });
    });
  };

  const removePeer=(peerId:string)=>{
        dispatch(removePeerAction(peerId))
  }
  const getUsers=({participants}: {participants:string[]})=>{
    return {participants}
  }
  const ShareSceen=()=>{
    if(screenSharingId){
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(switchStream)
    } 
    else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream)
    }

   
    
  }
  useEffect(()=>{
    const meId=uuidv4()
    const peer =new Peer(meId)
    console.log("------------------------------------")

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
    ws.on("user-shared-screen",(peerId)=>setSharingId(peerId))
    ws.on("stop-sharing",()=>setSharingId(""))


    return()=>{
      ws.off("room-created")
      ws.off("get-users")
      ws.off("user-disconnected")
      ws.off("user-shared-screen")
      ws.off("stop-sharing")
    }

  },[])


  useEffect(()=>{
    if(!me) return
    if(!stream) return
    ws.on("user-joined",({peerId})=>{
      const call=me.call(peerId,stream);
      call.on("stream",(peerStream)=>{
          dispatch(addPeerAction(peerId,peerStream))
          console.log(peers,"peer from user-joind")
      })
    })


    me.on("call",(call)=>{

      call.answer(stream)
      call.on("stream",(peerStream)=>{
        dispatch(addPeerAction(call.peer,peerStream))
      })
    })


},[me,stream])


useEffect(()=>{
  if(screenSharingId) {
    ws.emit("start-sharing",{peerId:screenSharingId,roomId})
  }
  else {
    ws.emit("stop-sharing")
  }
},[screenSharingId,roomId])

  console.log(peers, "outside useEffect")
  return (
    <RoomContext.Provider value={{ 
      ws ,me,stream,peers,ShareSceen,screenSharingId,setRoamId
      }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext