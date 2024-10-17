import { PiDotFill } from "react-icons/pi";
import pp from '../assets/images/maleprofile.png'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RiUser2Line } from "react-icons/ri";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useGetUserDetailQuery, useUpdateUserDetailMutation } from "../apis/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SettingTopMenu } from "./SettingTopMenu";
import uploadFile from "../features/uploadFile";

const Setting = () => {
  const [showInfo, setShowInfo] = useState(true);
  const [editName, setEditName] = useState(false);
  const { currentUser } = useSelector((state) => state.auth)
  const { data } = useGetUserDetailQuery(currentUser?._id);
  const [updateDetail] = useUpdateUserDetailMutation()
  const [name, setName] = useState(data?.user?.name)
  const [topMenu, setTopMenu] = useState(false)

  const handleSave = async () => {
    try {
      const response = await updateDetail({ id: currentUser._id, name }).unwrap();

      if (response.success === true) {
        console.log(response.message);
        toast(response.message, {
          position: "top-right"
        })
        setEditName(false)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: 'top-right'
      })
    }
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    try {
      const response = await updateDetail({ id: currentUser._id, profile_pic: uploadPhoto.url }).unwrap();

      if (response.success === true) {
        console.log(response.message);
        toast(response.message, {
          position: "top-right"
        })
        setEditName(false)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: 'top-right'
      })
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="">
        <div className="flex justify-between items-center px-5 pt-5 relative">
          <h3 className="font-semibold text-lg dark:text-zinc-50">Settings</h3>
          <HiOutlineDotsVertical className="cursor-pointer text-lg hover:text-zinc-500 transition-all duration-300" onClick={() => setTopMenu((prev) => !prev)} />
          {
            topMenu && <SettingTopMenu currentUser={currentUser} />
          }
        </div>
        <div className="flex justify-center flex-col items-center py-10 p-5">
          <div className="h-20 w-20 rounded-full overflow-hidden shadow-sm">
            <img src={`${data?.user?.profile_pic ? data?.user?.profile_pic : pp}`} className="w-full h-full" alt="" />
          </div>
          <div className="bg-[#E6EBF5] p-2 rounded-full -mt-6 ml-12 shadow-sm cursor-pointer">
            <label htmlFor="uploadImage" className="cursor-pointer">
              <MdModeEdit />
              <input type="file" id="uploadImage" className="hidden" onChange={handleUploadPhoto} />
            </label>
          </div>
          <div className="pt-1">
            <h5 className="font-semibold text-lg capitalize dark:text-zinc-50">{data?.user?.name}</h5>
            <p className="flex flex-row items-center text-sm text-zinc-600 justify-center dark:text-zinc-500"><PiDotFill className="text-green-500 text-xl" />Active</p>
          </div>
        </div>
        <div className="bg-zinc-200 h-[0.01rem] w-full"></div>
      </div>
      <div className="overflow-y-auto p-5 px-6 custom-scrollbar">
        <div className="">
          <div className="flex flex-row justify-between items-center cursor-pointer py-1 dark:text-zinc-50 px-3" onClick={() => setShowInfo((prev) => !prev)}>
            <span className="flex items-baseline gap-1"><RiUser2Line className="text-sm" />About</span>
            <span className="text-lg">{showInfo ? <IoIosArrowUp /> : <IoIosArrowDown />}  </span>
          </div>
          <div className={`transition-max-height duration-500 ease-in-out overflow-hidden bg-white space-y-3 dark:bg-zinc-800 p-4 ${showInfo ? 'max-h-96' : 'max-h-0 px-4 p-0'
            }`}>
            <div className="space-y-1">
              <h6 className="text-zinc-500 text-sm dark:text-white">Name</h6>
              {
                editName ?
                  <div className="w-full flex flex-row justify-between items-center h-[40px] rounded-sm border overflow-hidden dark:border-none">
                    <input type="text" className="h-full w-full focus:outline-none px-2 dark:bg-zinc-900 dark:text-zinc-100" value={name} onChange={(e) => setName(e.target.value)} />
                    <button className="bg-green-400 h-full px-5 text-white hover:bg-green-500" onClick={handleSave}>Save</button>
                  </div> :
                  <div className="flex flex-row items-center justify-between">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-50">{data?.user?.name}</p>
                    <span className="bg-[#E6EBF5] p-1 rounded-md cursor-pointer hover:bg-zinc-300"><MdModeEdit className="text-sm" onClick={() => setEditName((prev) => !prev)} /></span>
                  </div>
              }
            </div>
            <div className="space-y-1">
              <h6 className="text-zinc-500 text-sm dark:text-white">Email</h6>
              <p className="font-semibold text-zinc-800 dark:text-zinc-50">{data?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default Setting