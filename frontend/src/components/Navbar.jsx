import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const nav = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)
  return (
    <div className="bg-white w-[50vw] flex rounded-full p-2 px-5 items-center justify-between mx-auto bg-opacity-80 shadow-inner">
      <div className="">
        <p className="font-bold rounded-full text-green-400 uppercase cursor-pointer">Buzz<span className="bg-green-400 text-zinc-50 rounded-full pr-2 pl-1">Chat</span></p>
      </div>
      <div className="">
        <p className="text-lg cursor-pointer">Download</p>
      </div>
      <div className="">
        <p className="bg-green-950 py-2 px-5 rounded-full text-white hover:bg-green-900 cursor-pointer" onClick={() => currentUser ? nav('/chat') : nav('/signup')}>{currentUser ? 'Go Chat' : 'Sign Up'}</p>
      </div>
    </div>
  )
}
export default Navbar