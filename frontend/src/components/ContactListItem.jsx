import pp from '../assets/images/maleprofile.png'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

const ContactListItem = ({ users }) => {
  const { onlineUser } = useSelector((state) => state.auth)

  return (
    <Link to={"/chat/" + users?._id} className={`${onlineUser.includes(users._id) ? 'bg-green-200' : 'bg-zinc-300'} flex flex-col items-center gap-2 border dark:border-zinc-800 rounded-lg`
    }>
      <div className="h-14 w-14 rounded-full overflow-hidden -mt-6 border-[4px] border-green-50">
        <img src={`${users?.profile_pic ? users?.profile_pic : pp}`} alt="" className={`h-full w-full ${!onlineUser.includes(users._id) ? 'filter grayscale' : 'filter-none'}`} />
      </div>
      <div className={`${onlineUser.includes(users._id) ? 'bg-green-500' : 'bg-zinc-800'} w-full p-2 rounded-b-lg  text-center min-h-[3.5rem] flex items-center justify-center`}>
        <p className="text-sm text-white capitalize break-words leading-tight">{users?.name || name}</p>
      </div>
    </Link >
  )
}
export default ContactListItem