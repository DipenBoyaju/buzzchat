import { RiUser2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useUserLogoutMutation } from "../apis/authApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "../slices/authSlice";
import { persistor } from "../app/store";
import { NavLink, useNavigate } from "react-router-dom";
import { removeSocketConnection } from "../slices/socketSlice";

const ProfileMenu = () => {
  const [Logout] = useUserLogoutMutation()
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const { socketConnection } = useSelector((state) => state.socket)

  const handleLogout = async () => {
    try {
      const response = await Logout({ id: currentUser._id }).unwrap();

      if (response.success === true) {
        console.log("currentUser", currentUser);
        dispatch(removeCredentials())
        dispatch(removeSocketConnection())
        if (socketConnection) {
          socketConnection.disconnect();
        }
        persistor.purge();
        nav('/')
        toast.success(response.message, {
          position: "top-right"
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right"
      });
    }
  }
  return (
    <div className="absolute bottom-16 z-20 w-36 left-3 shadow-xl rounded-md border border-[rgba(0,0,0,0.1)] bg-zinc-50 py-1 dark:bg-zinc-800 dark:text-white">
      <NavLink className="text-[16px] flex items-center justify-between p-2 px-3 cursor-pointer hover:bg-green-50 dark:hover:bg-green-400">
        Profile
        <RiUser2Line />
      </NavLink>
      <NavLink className="text-[16px] flex items-center justify-between p-2 px-3 cursor-pointer hover:bg-green-50 dark:hover:bg-green-400 mb-1">
        Setting
        <IoSettingsOutline />
      </NavLink>
      <hr />
      <span className="text-[16px] flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-green-50 dark:hover:bg-green-400 mt-1" onClick={handleLogout}>
        Logout
        <RiLogoutCircleRLine />
      </span>
    </div>
  )
}

export default ProfileMenu;