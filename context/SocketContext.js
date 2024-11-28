import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [emergency, setEmergency] = useState(null);
  useEffect(() => {
    const newSocket = io("https://redcross-backend-production.up.railway.app");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, emergency, setEmergency }}>
      {children}
    </SocketContext.Provider>
  );
};
