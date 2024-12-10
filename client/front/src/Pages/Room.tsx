import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'
import VideoPlay from '../components/VideoPlay'
import { PeerState } from '../peerReducer'
import ShareScreenButton from '../components/ShareScreenButton'

const Room = () => {
    const {id}=useParams()
    const {ws,me,stream,peers,ShareSceen}=useContext(RoomContext)
    useEffect(()=>{
       if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
    },[id,ws,me])
  console.log(peers,"from Room")
  return (
    <div>

<div className='grid grid-cols-4 gap-4'>
       
          <VideoPlay stream={stream} />
          {
            Object.values(peers as PeerState).map(peer=>(
              <VideoPlay stream={peer.stream}/>
            ))
          }
        </div>

          <div className='fixed bottom-0 w-full flex justify-center
          '>
            <ShareScreenButton onClick={ShareSceen}/>
          </div>
    </div>
    
  )
}

export default Room