import React, { useContext } from "react";
import RoomContext from "../RoomContext";

export const JoinButton: React.FC = () => {
  const { ws } = useContext(RoomContext);
  
  const createRoom = () => {
    // Pass a value or empty object if you want to send some data
    ws.emit("create-room", {});
    console.log("Create room"); // Better logging
  }
  

  return (
    <div className="">

<button 
      onClick={createRoom} 
      className='bg-rose-400 w-80 px-8 py-2 text-white rounded-lg text-xl hover:bg-rose-600'
    >
      Join Room
    </button>
   
    </div>
    


  )
}