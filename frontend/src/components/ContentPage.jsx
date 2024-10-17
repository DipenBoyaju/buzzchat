import { useSelector } from "react-redux"
import Profile from "./Profile"
import Setting from "./Setting"
import ChatLists from "./ChatLists"
import ContactList from "./ContactList"
import Group from "./Group"

const ContentPage = () => {
  const { sideContent } = useSelector((state) => state.feature)
  return (
    <div className="w-full overflow-hidden z-10 dark:bg-zinc-900">
      {
        sideContent === 'profile' &&
        <Profile />
      }
      {
        sideContent === 'chat' &&
        <>
          <ChatLists />
        </>
      }
      {
        sideContent === 'group' &&
        <>
          <Group />
        </>
      }
      {
        sideContent === 'contact' &&
        <>
          <ContactList />
        </>
      }
      {
        sideContent === 'setting' &&
        <Setting />
      }
    </div>
  )
}
export default ContentPage