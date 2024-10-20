import { LuSearch } from "react-icons/lu"
import ContactListItem from "./ContactListItem"
import { useGetAllUserDetailQuery, useSearchUserQuery } from "../apis/userApi"
import { useSelector } from "react-redux"
import { useState } from "react"

const ContactList = () => {
  const { data: allUsers } = useGetAllUserDetailQuery()
  const [searchTitle, setSearchTitle] = useState("")
  const { currentUser, onlineUser } = useSelector((state) => state.auth)
  const { data: searchResults } = useSearchUserQuery(
    searchTitle, {
    skip: !searchTitle
  }
  )

  const getSortedUsers = (users) => {
    if (!users || users.length === 0) return []
    const onlineUsers = users.filter((user) => onlineUser.includes(user._id) && user._id !== currentUser._id)
    const offlineUsers = users.filter((user) => !onlineUser.includes(user._id) && user._id !== currentUser._id)

    return [...onlineUsers, ...offlineUsers]
  }


  return (
    <div className="h-screen flex flex-col pt-5">
      <div className="px-6">
        <h3 className="font-semibold text-lg dark:text-zinc-50">Contacts</h3>
        <div className="flex flex-row items-center bg-[#E6EBF5] h-[40px] dark:bg-zinc-800 rounded-sm overflow-hidden mt-7">
          <div className="px-4">
            <LuSearch className="text-lg text-zinc-600 dark:text-zinc-300" />
          </div>
          <input type="text" className="w-full h-full bg-transparent hover:outline-none focus:outline-none text-zinc-600 dark:text-zinc-200 text-sm" placeholder="Search messages of users"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)} />
        </div>
      </div>
      <div className="overflow-y-auto custom-scrollbar px-5 relative z-10 py-4 pt-12">
        <div className="grid grid-cols-3 gap-2 gap-y-10">
          {
            searchTitle ? (
              searchResults?.data?.length ? (
                getSortedUsers(searchResults.data).map((item) => (
                  <ContactListItem users={item} key={item._id} />
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-600 dark:text-gray-300">
                  No users found
                </div>
              )
            ) : (
              getSortedUsers(allUsers?.user).map((item) => (
                <ContactListItem users={item} key={item._id} />
              ))
            )
          }

        </div>
      </div>
    </div>
  )
}
export default ContactList