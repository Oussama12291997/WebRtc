import React, { createContext, ReactNode } from "react"
import {io} from "socket.io-client"

const WS = "http://127.0.0.1:8080/"
const RoomContext = createContext<any | null>(null)
const ws = io(WS)

interface RoomProviderProps {
  children: ReactNode
}
export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  return (
    <RoomContext.Provider value={{ ws }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext