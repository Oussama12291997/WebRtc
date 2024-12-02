import React, { useContext } from "react";
import RoomContext from "../RoomContext";

export const JoinButton: React.FC = () => {
  const { ws } = useContext(RoomContext);
  
  const JoinRoom = () => {
    // Pass a value or empty object if you want to send some data
    ws.emit("join-room", {});
    console.log("Joining room"); // Better logging
  }

  return (
    <button 
      onClick={JoinRoom} 
      className='bg-rose-400 px-8 py-2 text-white rounded-lg text-xl hover:bg-rose-600'
    >
      Start new meeting
    </button>
  )
}