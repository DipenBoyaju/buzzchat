import { LuSearch } from "react-icons/lu"
import construction from '../assets/images/construction.gif'

const Group = () => {
  return (
    <div className="h-screen flex flex-col pt-5">
      <div className="px-6">
        <h3 className="font-semibold text-lg dark:text-zinc-50">Group</h3>
        <div className="flex flex-row items-center bg-[#E6EBF5] dark:bg-zinc-800 h-[40px] rounded-sm overflow-hidden mt-7">
          <div className="px-4">
            <LuSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
          </div>
          <input type="text" className="w-full h-full bg-transparent hover:outline-none focus:outline-none text-zinc-600 dark:text-zinc-200 text-sm" placeholder="Search group" />
        </div>
      </div>
      <div className="flex justify-center items-center text-center h-screen">
        <img src={construction} alt="" className="mix-blend-multiply" />
      </div>
    </div>
  )
}
export default Group