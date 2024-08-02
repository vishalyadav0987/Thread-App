import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './AuthContext'

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUser] = useState([])
    const { authUser } = useAuthContext();
    useEffect(() => {
        const socket = io("https://thread-app-mc1i.onrender.com", {
            query: {
                userId: authUser?._id,
            },
            withCredentials: true
        });
        setSocket(socket);

        // listen the event using socket.on
        socket.on("getOnlineUsers", (users) => {
            setOnlineUser(users);
        })
        return () => socket && socket.close()
    }, [authUser?._id]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}

