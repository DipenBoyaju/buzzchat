import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SessionEnd = () => {
  const nav = useNavigate();

  return (
    <div className="bg-[#00000050] backdrop-blur-sm h-full w-full flex justify-center items-center">
      <div className="bg-zinc-900 px-12 py-8 rounded-2xl">
        <div className="flex gap-5 items-center">
          <BiSolidError className="text-4xl text-zinc-50" />
          <div className="space-y-1">
            <h1 className="font-semibold text-lg text-zinc-100">Your session has expired</h1>
            <p className="text-sm text-zinc-400">Please login again to continue using the app.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={() => nav('/login')} className="bg-zinc-700 text-zinc-200 p-2 px-3 rounded-md mt-8 border border-zinc-500 hover:bg-zinc-600 transition-all duration-300">Log in</button>
        </div>
      </div>
    </div>
  )
}
export default SessionEnd