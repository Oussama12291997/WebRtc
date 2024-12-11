import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'
import VideoPlay from '../components/VideoPlay'
import { PeerState } from '../peerReducer'
import ShareScreenButton from '../components/ShareScreenButton'

const Room = () => {
    const {id}=useParams()

    const {ws,me,stream,peers,ShareSceen,screenSharingId,setRoamId}=useContext(RoomContext)
    const {[screenSharingId]:sharing,...peersToShow}=peers
    useEffect(()=>{
       if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
    },[id,ws,me])

    useEffect(()=>{
      setRoamId(id)
    },[id,setRoamId])
    const screenSharingVideo= screenSharingId===me?.id ? 
    stream: peers[screenSharingId]?.stream
  console.log(peers,"from Room")
  console.log("--------------------")
  console.log(screenSharingVideo," sharing video")

  console.log("--------------------")
    console.log(peers," gettting peers")
    console.log("--------------------")
console.log("sharing id",screenSharingId)
  return (
    <div>
          <div className="flex">
            {screenSharingVideo && (<div className='w-4/5 pr-4'>
              <VideoPlay stream={screenSharingVideo}/>
              </div>)}


              <div className={`grid  ${screenSharingVideo? "w-1/5 grid-col-1":"grid-cols-4 gap-4"} `}>
       

         {screenSharingId!==me?.id &&(
          <VideoPlay stream={stream}/>)}
          {

            Object.values(peersToShow as PeerState).map(peer=>(
              <VideoPlay stream={peer.stream}/>
            ))
          }
        </div>
          </div>


          <div className='fixed bottom-0 w-full flex justify-center
          '>
            <ShareScreenButton onClick={ShareSceen}/>
          </div>
    </div>
    
  )
}

export default Room