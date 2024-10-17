import { LuSearch } from "react-icons/lu";
import ChatListItem from "./ChatListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useGetAllUserDetailQuery } from "../apis/userApi";
import ActiveUser from "./ActiveUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatLists = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { data: allUsers } = useGetAllUserDetailQuery()
  const [allUser, setAllUser] = useState([])
  const { socketConnection } = useSelector((state) => state.socket)
  const [dataUser, setDataUser] = useState({
    online: false
  })

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('sidebar', currentUser._id)

      socketConnection.on('conversation', (data) => {
        console.log('conversation', data)

        const conversationUserData = data.map((conversationUser) => {
          if (conversationUser?.sender?._id === conversationUser?.receiver?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender
            }
          }
          else if (conversationUser?.receiver?._id !== currentUser?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.receiver
            }
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender
            }
          }
        })

        setAllUser(conversationUserData)
      })
    }
  }, [socketConnection, currentUser])

  console.log("conver user", allUser);
  console.log("conver user detail", allUser.userDetails);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="h-screen flex flex-col pt-5">
      <div className="px-6">
        <h3 className="font-semibold text-lg dark:text-zinc-50">Chats</h3>
        <div className="flex flex-row items-center bg-[#E6EBF5] dark:bg-zinc-800 h-[40px] rounded-sm overflow-hidden mt-7">
          <div className="px-4">
            <LuSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
          </div>
          <input type="text" className="w-full h-full bg-transparent hover:outline-none focus:outline-none text-zinc-600 dark:bg-zinc-800 text-sm dark:text-zinc-200" placeholder="Search messages of users" />
        </div>
        <div className="py-5 w-full overflow-clip">
          {allUsers?.user?.length > 0 ? (
            <Carousel
              responsive={responsive}
              swipeable={true}
              arrows={false}
              showDots={false}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
            >
              {allUsers.user
                .filter((item) => item._id !== currentUser._id && item.activeStatus)
                .map((item) => (
                  <ActiveUser users={item} key={item._id} />
                ))}
            </Carousel>
          ) : (
            <div className="dark:text-white">No active users</div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar px-5 relative z-10">
        <div className="">
          <h6 className=" font-semibold dark:text-zinc-50">Recent</h6>
        </div>
        <div className="">
          {

            allUser?.map((conv) => {
              return (
                <ChatListItem conv={conv} key={conv?._id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default ChatLists