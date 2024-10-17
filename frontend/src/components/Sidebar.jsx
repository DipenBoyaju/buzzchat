import { BiMessageSquareDetail } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { LuMoon, LuSun } from "react-icons/lu";
import { GrLanguage } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiContactsLine } from "react-icons/ri";
import { LiaUserCircleSolid } from "react-icons/lia";
import pp from '../assets/images/maleprofile.png'
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import logo from '../assets/images/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setSideContent } from "../slices/featureSlice";
import { useGetUserDetailQuery } from "../apis/userApi";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth)
  const { data } = useGetUserDetailQuery(currentUser?._id);
  const linkStyle = 'p-3 rounded-lg cursor-pointer hover:bg-green-50 dark:hover:bg-green-400';

  const { sideContent, darkMode } = useSelector((state) => state.feature)
  const [profileMenu, setProfileMenu] = useState(false)
  const nav = useNavigate();
  return (
    <div className="w-full h-full  z-20">
      <div className="bg-white dark:bg-zinc-950 shadow-md shadow-zinc-300 dark:shadow-zinc-800 w-20 h-full fixed">
        <div className="items-center flex justify-center py-5 w-16 mx-auto">
          {/* <img src={logo} className="items-center dark:bg-green-300 rounded-lg" alt="" onClick={() => nav('/')} /> */}
          <h1 className="dark:text-white text-center leading-1 font-semibold uppercase bg-yellow-500 rounded-b-full pt-1 rounded-t-lg cursor-pointer">Chat <span className=" bg-green-400 px-2 rounded-full">Buzz</span></h1>
        </div>
        <div className="flex flex-col h-auto text-[1.7rem] justify-center items-center gap-5">
          <div className={`${linkStyle} ${sideContent === "profile" ? 'bg-green-50 dark:bg-green-400' : 'bg-transparent'}`} onClick={() => dispatch(setSideContent("profile"))}>
            <LiaUserCircleSolid className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div className={`${linkStyle} ${sideContent === "chat" ? 'bg-green-50 dark:bg-green-400' : 'bg-transparent'}`} onClick={() => dispatch(setSideContent("chat"))}>
            <BiMessageSquareDetail className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div onClick={() => dispatch(setSideContent("group"))} className={`${linkStyle} ${sideContent === "group" ? 'bg-green-50 dark:bg-green-400' : 'bg-transparent'}`}>
            <HiOutlineUserGroup className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div className={`${linkStyle} ${sideContent === "contact" ? 'bg-green-50 dark:bg-green-400' : 'bg-transparent'}`} onClick={() => dispatch(setSideContent("contact"))}>
            <RiContactsLine className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div onClick={() => dispatch(setSideContent("setting"))} className={`${linkStyle} ${sideContent === "setting" ? 'bg-green-50 dark:bg-green-400' : 'bg-transparent'}`}>
            <GoGear className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div className={linkStyle}>
            <GrLanguage className="text-[#878A92] dark:text-zinc-50" />
          </div>
          <div className={linkStyle} onClick={() => dispatch(setDarkMode())}>
            {
              darkMode ? <LuSun className="text-[#878A92] dark:text-zinc-50" /> : <LuMoon className="text-[#878A92]" />
            }
          </div>
          <div className="h-12 w-12 rounded-full cursor-pointer overflow-hidden border-2 border-zinc-900" onClick={() => setProfileMenu((prev) => !prev)}>
            <img src={`${data?.user?.profile_pic ? data?.user?.profile_pic : pp}`} className="w-full h-full" alt="" />
          </div>
          {profileMenu ? <ProfileMenu /> : ''}
        </div>
      </div>
    </div >
  )
}
export default Sidebar