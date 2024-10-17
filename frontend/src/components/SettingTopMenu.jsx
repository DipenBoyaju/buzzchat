import { GoEye } from "react-icons/go";
import { RiEyeCloseFill } from "react-icons/ri";
import { useGetUserDetailQuery, useUpdateUserDetailMutation } from "../apis/userApi";
import { useState } from "react";

export const SettingTopMenu = ({ currentUser }) => {
  const [updateDetail] = useUpdateUserDetailMutation()
  const { data, refetch } = useGetUserDetailQuery(currentUser?._id);
  const [activeStatus, setActiveStatus] = useState(data?.user?.active ?? true)

  const handleActiveStatus = async () => {
    const status = activeStatus ? true : false;
    console.log(status);

    try {
      const response = await updateDetail({
        id: currentUser?._id,
        active: status,
      }).unwrap();

      if (response.success === true) {
        console.log('database', response?.data?.active);
        setActiveStatus((prev) => !prev);
        refetch();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="w-36 shadow-md absolute top-12 right-5 border">
      <p className="p-3 flex flex-row items-center gap-2 cursor-pointer hover:bg-zinc-200 transition-all duration-300 text-sm" onClick={handleActiveStatus}>{activeStatus ? <RiEyeCloseFill /> : <GoEye />} {activeStatus ? 'Hide Active' : 'Show Active'}</p>
    </div>
  )
}