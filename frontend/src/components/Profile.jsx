import { PiDotFill } from "react-icons/pi";
import pp from '../assets/images/maleprofile.png'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiUser2Line } from "react-icons/ri";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserDetailQuery } from "../apis/userApi";

const Profile = () => {
  const [showInfo, setShowInfo] = useState(true)
  const { currentUser } = useSelector((state) => state.auth)
  const { data } = useGetUserDetailQuery(currentUser?._id);

  return (
    <div className="h-screen flex flex-col">
      <div className="px-6">
        <h3 className="font-semibold text-lg pt-5 dark:text-zinc-50">My Profile</h3>
        <div className="flex justify-center flex-col items-center py-10 p-5">
          <div className="h-20 w-20 rounded-full overflow-hidden shadow-sm">
            <img src={`${data?.user?.profile_pic ? data?.user?.profile_pic : pp}`} className="w-full h-full" alt="" />
          </div>
          <div className="pt-2">
            <h5 className="font-semibold text-lg capitalize dark:text-zinc-50">{currentUser.name}</h5>
            <p className="flex flex-row items-center text-sm text-zinc-600 justify-center dark:text-zinc-500"><PiDotFill className="text-green-500 text-xl" />Active</p>
          </div>
        </div>
        <div className="bg-zinc-200 h-[0.01rem] w-full"></div>
      </div>
      <div className="overflow-y-auto p-5 px-6 custom-scrollbar">
        <div className="">
          <div className="flex flex-row justify-between items-center cursor-pointer py-1 px-3 dark:text-zinc-50" onClick={() => setShowInfo((prev) => !prev)}>
            <span className="flex items-baseline gap-1"><RiUser2Line className="text-sm" />About</span>
            <span className="text-lg">{showInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}  </span>
          </div>
          <div className={`transition-max-height duration-500 ease-in-out overflow-hidden bg-white space-y-3 p-4 dark:bg-zinc-800 ${showInfo ? 'max-h-96' : 'max-h-0 px-4 p-0 opacity-0'
            }`}>
            <div className="space-y-1">
              <h6 className="text-zinc-500 text-sm dark:text-white">Name</h6>
              <p className="font-semibold text-zinc-800 dark:text-zinc-50">{currentUser.name}</p>
            </div>
            <div className="space-y-1">
              <h6 className="text-zinc-500 text-sm dark:text-white">Email</h6>
              <p className="font-semibold text-zinc-800 dark:text-zinc-50">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile