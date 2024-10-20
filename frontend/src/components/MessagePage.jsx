
import { useParams } from 'react-router-dom';
import messagebg from '../assets/images/wallapaper.jpeg'
import darkbg from '../assets/images/darkBackground.jpg'
import { BsFillChatTextFill } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import pp from "../assets/images/maleprofile.png"
import { RxDotsHorizontal } from "react-icons/rx";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import uploadFile from '../features/uploadFile';
import moment from 'moment'
import EmojiPicker from 'emoji-picker-react';
import { BsFillEmojiLaughingFill } from "react-icons/bs";

const MessagePage = () => {

  const { userId } = useParams();
  const [openEmoji, setOpenEmoji] = useState(false)
  const { currentUser } = useSelector((state) => state.auth)
  const { socketConnection } = useSelector((state) => state.socket)
  const { darkMode } = useSelector((state) => state.feature)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false
  })
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })

  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef(null)

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setMessage(prev => {
      return {
        ...prev,
        imageUrl: uploadPhoto.url
      }
    })
  }

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setMessage(prev => {
      return {
        ...prev,
        videoUrl: uploadPhoto.url
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', userId)

      socketConnection.emit('seen', userId)

      socketConnection.on('message-page', (data) => {
        setDataUser(data)

      })
      socketConnection.on('message', (data) => {
        console.log("message data", data);
        setAllMessage(data)
      })
    }
  }, [socketConnection, userId, currentUser])

  const handleOnChange = (e) => {
    const { value } = e.target;

    setMessage(prev => {
      return {
        ...prev,
        text: value
      }
    })
  }

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => ({
      ...prev,
      text: prev.text + emoji.emoji
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setOpenEmoji(false);
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: currentUser._id,
          receiver: userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: currentUser._id
        })
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }

  return (
    <div className="h-screen relative bg-zinc-200 w-full" style={{ backgroundImage: `url(${darkMode ? darkbg : messagebg})`, backgroundSize: `${darkMode ? '' : 'cover'}`, backgroundRepeat: `${darkMode ? 'repeat' : 'no-repeat'}` }}>
      <div className="">
        {
          !userId ? <div className="h-screen">
            <div className='text-center flex h-full justify-center flex-col items-center my-auto'>
              <BsFillChatTextFill className='text-9xl text-green-300 bg-white p-4 rounded-t-full -mb-2 shadow-lg' />
              <h1 className='flex justify-center items-center text-xl bg-white p-4 px-8 rounded-3xl shadow-sm'>Explore users to start a conversation with</h1>
            </div>
          </div> :
            <div className="h-full">
              <header className='sticky top-0 bg-white w-full p-3 h-16 px-4 shadow-md flex flex-row items-center justify-between dark:bg-zinc-900'>
                <div className="flex gap-2 items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img src={`${dataUser?.profile_pic ? dataUser?.profile_pic : pp}`} className='w-full h-full' alt="" />
                  </div>
                  <div className="">
                    <h2 className='font-bold capitalize dark:text-zinc-50'>{dataUser.name}</h2>
                    <p className={`text-sm ${dataUser.online ? 'text-green-500' : 'text-zinc-400'}`}>
                      {dataUser.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="">
                  <button><RxDotsHorizontal className='text-2xl text-zinc-50' /></button>
                </div>
              </header>

              <div className="h-[calc(100vh-128px)] bg-[#00000030] overflow-y-auto custom-scrollbar overflow-x-hidden px-2">

                <div className="flex flex-col gap-2 py-2" ref={currentMessage}>
                  {
                    allMessage.map((msg, index) => {
                      return (
                        <div className={`bg-white dark:bg-zinc-900 dark:text-zinc-50 w-fit max-w-md md:max-w-sm lg:max-w-md p-1 pt-1 rounded-md ${currentUser._id === msg?.msgByUserId ? "ml-auto bg-teal-200" : "bg-white"}`} key={index}>
                          <div className='w-full relative'>
                            {
                              msg?.imageUrl && (
                                <div className="">
                                  <img
                                    src={msg?.imageUrl}
                                    className='w-full h-full object-scale-down pb-1'
                                  />
                                </div>
                              )
                            }
                            {
                              msg?.videoUrl && (
                                <video
                                  src={msg.videoUrl}
                                  className='w-full h-full object-scale-down'
                                  controls
                                />
                              )
                            }
                          </div>
                          <p className='px-2'>{msg.text}</p>
                          <p className='text-xs text-zinc-400 ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm a')}</p>
                        </div>
                      )
                    })
                  }
                </div>

                {
                  message.imageUrl && (
                    <div className=" bg-white">
                      <img src={message.imageUrl} className='aspect-video w-full h-full max-w-sm m-2' alt="uploadImage" />
                    </div>
                  )
                }

                {
                  message.videoUrl && (
                    <div className=" bg-white">
                      <video src={message.videoUrl} className='aspect-video w-full h-full max-w-sm m-2' controls />
                    </div>
                  )
                }

                {
                  loading && (
                    <p className='text-black text-3xl mt-5'>loading</p>
                  )
                }
              </div>

              <footer className='absolute bottom-0 bg-white dark:bg-zinc-900 w-full p-3 h-16 shadow-md dark:border-zinc-900 border-t flex items-center gap-2'>
                <div className="">
                  <form action="" className='flex items-center gap-1'>
                    <label htmlFor="uploadImage" className='cursor-pointer hover:bg-green-500 rounded-full p-2 group transition-all duration-300'>
                      <BsFillImageFill className='text-green-400 text-xl group-hover:text-white transition-all duration-300' />
                    </label>
                    <label htmlFor="uploadVideo" className='cursor-pointer hover:bg-purple-500 rounded-full p-2 group transition-all duration-300'>
                      <FaVideo className='text-purple-400 text-xl group-hover:text-white transition-all duration-300' />
                    </label>
                    <input type="file" id='uploadImage' onChange={handleUploadImage} className='hidden' />
                    <input type="file" id='uploadVideo' onChange={handleUploadVideo} className='hidden' />
                  </form>
                </div>
                <div className="">
                  <form className="flex flex-row items-center gap-3" onSubmit={handleSendMessage}>
                    <div className="">
                      <input type="text" name='text' className=' bg-green-100 dark:bg-zinc-950 dark:text-zinc-200 h-10 rounded-sm w-[45vw] px-2 focus:outline-none' placeholder='Enter Message' value={message.text} onChange={handleOnChange} onClick={() => setOpenEmoji(false)} />
                    </div>
                    <div className="dark:hover:bg-zinc-800 cursor-pointer hover:bg-green-200 p-3 rounded-full" onClick={() => setOpenEmoji((prev) => !prev)}>
                      <BsFillEmojiLaughingFill className='text-yellow-400 text-2xl' />
                    </div>
                    {
                      openEmoji && <div className="absolute z-20 right-5 bottom-16">
                        <EmojiPicker onEmojiClick={handleEmojiClick} theme={darkMode ? "dark" : "light"} />
                      </div>
                    }
                    <button type='submit' className='flex items-center gap-1 bg-green-400 text-white p-2 px-3 rounded-sm'><RiSendPlane2Fill className='text-lg' />Send</button>
                  </form>
                </div>
              </footer>
            </div>
        }

      </div>

    </div>
  )
}
export default MessagePage