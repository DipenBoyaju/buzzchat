import { Outlet } from "react-router-dom"
import ContentPage from "../components/ContentPage"
import Sidebar from "../components/Sidebar"

const Rootlayout = () => {
  return (

    <>
      <Sidebar />
      <ContentPage />
      <Outlet />
    </>
  )
}
export default Rootlayout