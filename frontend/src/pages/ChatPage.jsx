import { useEffect } from "react"
import ContentPage from "../components/ContentPage"
import MessagePage from "../components/MessagePage"
import Sidebar from "../components/Sidebar"
import io from 'socket.io-client'
import { baseUrl } from "../utils/baseUrl"
import { useDispatch, useSelector } from "react-redux"
import { setOnlineuser } from "../slices/authSlice"
import { setSocketConnection } from "../slices/socketSlice"

const ChatPage = () => {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const socketConnection = io(baseUrl, {
      auth: {
        token: token
      }
    })

    socketConnection.on('onlineUser', (data) => {
      console.log(data);
      dispatch(setOnlineuser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])
  return (

    <div className="grid lg:grid-cols-[480px,1fr] h-screen max-h-screen">
      <section className="bg-green-50 grid lg:grid-cols-[80px,1fr] shadow-md shadow-zinc-300">
        <Sidebar />
        <ContentPage />
      </section>
      <div className="">
        <MessagePage />
      </div>
    </div>
  )
}
export default ChatPage