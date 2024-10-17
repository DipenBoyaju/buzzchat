import pp from '../assets/images/maleprofile.png'
import { GoDotFill } from "react-icons/go";
import { BsImageFill } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatListItem = ({ conv }) => {
  const { onlineUser } = useSelector((state) => state.auth)
  return (
    <Link to={"/chat/" + conv?.userDetails?._id} className={`p-2 flex flex-row justify-between cursor-pointer dark:hover:bg-zinc-800 hover:bg-green-200 rounded-md ${Boolean(conv?.unseenMsg) ? 'bg-green-200 dark:bg-zinc-800' : "bg-transparent"}`}>
      <div className="flex flex-row gap-3 items-center">
        <div className="">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={`${conv?.userDetails?.profile_pic || pp}`} alt="" className='w-full h-full relative' />
          </div>
          {
            onlineUser.includes(conv?.userDetails?._id) ?
              <div className="absolute -mt-5 ml-8 z-10"><GoDotFill className='text-green-400 text-xl' /></div> : ''
          }

        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold dark:text-zinc-100 capitalize">{conv?.userDetails?.name}</p>
          <div className="">
            <div className="flex gap-1">
              {
                conv?.lastMsg?.imageUrl && (
                  <div className="flex items-center gap-1 text-zinc-500 text-sm dark:text-zinc-500">
                    <span className='flex gap-1 items-center'><BsImageFill /></span>
                    {!conv?.lastMsg?.text && <span className='text-sm'>Image</span>}
                  </div>
                )
              }
              {
                conv?.lastMsg?.videoUrl && (
                  <div className="flex items-center gap-1 text-zinc-500 text-sm dark:text-zinc-500">
                    <span className='flex gap-1 items-center text-zinc-500 text-sm'><IoVideocam /></span>
                    {!conv?.lastMsg?.text && <span className='text-sm'>Image</span>}
                  </div>
                )
              }
              <p className="text-zinc-600 dark:text-zinc-500 text-sm">{conv?.lastMsg?.text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">05min</p>
        {Boolean(conv?.unseenMsg) && <div className='text-xs bg-green-400 rounded-full w-7 text-white text-center'>{conv?.unseenMsg}</div>}
      </div>
    </Link>
  )
}
export default ChatListItem