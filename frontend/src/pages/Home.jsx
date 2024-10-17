import { useNavigate } from "react-router-dom"
import { BsArrowUpRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import dashboard from '../assets/images/dashboard.png'
import pp1 from '../assets/images/pp1.jpg'
import pp2 from '../assets/images/pp2.jpg'
import pp3 from '../assets/images/pp3.jpg'
import Footer from "../components/Footer";

const Home = () => {
  const nav = useNavigate()
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="">
      <div className="px-10 pt-2 overflow-hidden">
        <div className="flex flex-col justify-center w-full text-center gap-5 p-5 bg-gradient-to-b from-green-300 to-zinc-50 rounded-[100px] pb-52">
          <Navbar />
          <div className="pt-16">
            <span className="bg-white rounded-full text-lg p-4 px-10 font-semibold text-green-700">The power of communication  🚀</span>
          </div>
          <h1 className="text-[5rem] leading-none font-bold font-noto cursor-default pt-6 text-zinc-50">Discover a new way <br />to stay in touch</h1>
          <p className="text-lg py-3 text-zinc-500">A unified hub for all your messages, ensuring you never <br />miss a beat when it comes to your communication.</p>
          <div className="flex justify-center">
            <button onClick={() => !currentUser ? nav('/login') : nav('/chat')} className="bg-green-400 w-auto p-3 rounded-full px-8 items-center flex gap-2 text-white">{!currentUser ? 'Get Started' : 'Go Chat'} <BsArrowUpRight /></button>
          </div>
        </div>
      </div>
      <div className="relative w-[70vw] mx-auto  overflow-hidden -mt-36 rounded-3xl">
        <div className=" border-[8px] border-opacity-45 border-zinc-300 overflow-hidden rounded-3xl">
          <img src={dashboard} alt="" className="h-full w-full" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className=" text-center py-32">
        <div className="flex justify-center gap-2 items-center pb-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-[5px] border-zinc-200">
            <img src={pp1} alt="" className="w-full h-full" />
          </div>
          <div className="w-28 h-28 rounded-full overflow-hidden border-[5px] border-zinc-200">
            <img src={pp3} alt="" className="w-full h-full" />
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden border-[5px] border-zinc-200">
            <img src={pp2} alt="" className="w-full h-full" />
          </div>
        </div>
        <h2 className="text-4xl font-semibold text-zinc-800">The Preferred Messaging Dashboard <br />for a Thriving Community</h2>
        <p className="text-zinc-500 py-6">At BuzzChat, we are dedicated to revolutionizing the way<br />you manage and optimize your communication</p>

        <div className="mt-8 flex justify-center items-center">
          <div className="h-[2px] w-32 bg-zinc-300 rounded-l-full"></div>
          <span className="border-2 border-zinc-200 rounded-full py-2 px-5 font-semibold hover:bg-green-300 transition-all duration-300 hover:text-white cursor-pointer hover:border-green-400">BuzzChat</span>
          <div className="h-[2px] w-32 bg-zinc-300 rounded-r-full"></div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home