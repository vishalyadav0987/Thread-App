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
        const socket = io("http://localhost:3000", {
            query: {
                userId: authUser?._id,
            }
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

