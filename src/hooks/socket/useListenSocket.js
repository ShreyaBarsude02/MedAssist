import { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
import io from "socket.io-client";

useListenSocket = () =>{
    useEffect (() =>{
    if (localStorage.getItem("authtoken") != undefined) {
        socket = io("http://localhost:3000", {
          transports: ["websocket"],
          query: { userId: localStorage.getItem("userId") },
        });
        setSocket(socket);
        socket.on("connect", () => {
          setSocketId(socket.id);
        });
        
    }
    return () => {
        socket.off();
      };
}, [localStorage.getItem("userId")])
}
