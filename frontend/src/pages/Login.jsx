import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { CiLock } from "react-icons/ci";
import bg2 from '../assets/images/bg3.jpg'
import { useState } from "react";
import { useUsersigninMutation } from "../apis/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";


const Login = () => {
  const nav = useNavigate();
  const [login] = useUsersigninMutation()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(formData).unwrap();
      const { user, token, expiresAt } = response
      if (response.success === true) {

        dispatch(setCredentials({ user, token, expiresAt }))
        console.log(response.message);
        nav('/chat')
        toast.success(response.message, {
          position: "top-right"
        });
      } else {
        toast.error(response.message, {
          position: "top-right"
        });
      }
    } catch (error) {
      console.log('Registration error:', error);
      toast.error(error?.data.message, {
        position: "top-right"
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#F7F7FF]" style={{
      backgroundImage: `url(${bg2})`,
      backgroundSize: '500px 500px', backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
    }}>
      <div className="bg-[#05a844] w-full h-full opacity-50 absolute z-10"></div>
      <div className="flex flex-col w-full max-w-md p-8 px-10 relative z-20 bg-white shadow-lg rounded-xl">
        <div className="text-center mb-4">
          <span className="font-bold rounded-full text-green-400 uppercase cursor-pointer">Buzz<span className="bg-green-400 text-zinc-50 rounded-full pr-2 pl-1" onClick={() => nav('/')}>Chat</span></span>
        </div>
        {/* <div className="text-2xl font-bold mb-4 text-center"><span className="text-green-500 font-bold text-3xl uppercase cursor-pointer" >Buzz</span>Chat</div> */}
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold mb-1 ">Sign In</h3>
          <p className="text-gray-600">Sign in to continue to BuzzChat.</p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <div className="flex items-center border border-zinc-300 rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-[#ececec] border-r border-zinc-300">
                  <HiOutlineUser className="text-zinc-800 text-lg" />
                </div>
                <input
                  type="email"
                  placeholder="JohnDoe"
                  className="w-full p-2 border-gray-300 focus:outline-none "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <div className="flex items-center border border-zinc-300 rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-[#ececec] border-r border-zinc-300 ">
                  <CiLock className="text-zinc-800 text-lg " />
                </div>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full p-2 border-gray-300 focus:outline-none"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-zinc-600">
            Don’t have an account?{" "}
            <span
              className="text-green-500 hover:underline cursor-pointer"
              onClick={() => nav('/signup')}
            >
              Signup now
            </span>
          </p>
          <p className="text-sm text-zinc-600 pt-2">© 2024 BuzzChat. Crafted * with by <a href="https://dipenboyaju.vercel.app/" target="_blank">Dipen Boyaju</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
