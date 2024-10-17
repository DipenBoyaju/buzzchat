import { GoDotFill } from 'react-icons/go'
import pp from '../assets/images/maleprofile.png'
import { useNavigate } from 'react-router-dom'

const ActiveUser = ({ users }) => {
  const nav = useNavigate()
  return (
    <div onClick={() => nav("/chat/" + users._id)} className="h-14 w-14 rounded-full overflow-hidden cursor-pointer">
      <img src={`${users?.profile_pic ? users?.profile_pic : pp}`} alt="" className="w-full h-full relative z-10" />
      <div className="absolute -mt-5 ml-10 z-20"><GoDotFill className='text-green-500 shadow-2xl text-xl' /></div>
    </div>
  )
}
export default ActiveUser