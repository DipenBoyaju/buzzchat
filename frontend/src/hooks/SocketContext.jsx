// context/SocketContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { baseUrl } from '../utils/baseUrl'; // Import your base URL
import { useDispatch } from 'react-redux';
import { setOnlineuser } from '../slices/authSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ token, children }) => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      // Establish socket connection with authentication token
      const socketConnection = io(baseUrl, {
        auth: { token }
      });

      socketConnection.on('onlineUser', (data) => {
        console.log(data);
        dispatch(setOnlineuser(data))
      })

      // Set the socket connection in state
      setSocket(socketConnection);

      // Clean up on component unmount
      return () => {
        socketConnection.disconnect();
      };
    }
  }, [token, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
