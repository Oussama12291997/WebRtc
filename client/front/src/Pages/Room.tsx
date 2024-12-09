import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RoomContext from '../RoomContext'
import VideoPlay from '../components/VideoPlay'
import { PeerState } from '../peerReducer'

const Room = () => {
    const {id}=useParams()
    const {ws,me,stream,peers}=useContext(RoomContext)
    useEffect(()=>{
       if(me) ws.emit("join-room",{roomId:id,peerId:me._id})
    },[id,ws,me])
  return (
    <div className='grid grid-cols-4 gap-4'>
       
          <VideoPlay stream={stream} />
          {
            Object.values(peers as PeerState).map(peer=>(
              <VideoPlay stream={peer.stream}/>
            ))
          }
        </div>
  )
}

export default Room