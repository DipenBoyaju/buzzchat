import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatPage from './pages/ChatPage'
import PublicRoute from './features/routes/PublicRoute'
import ProtectedRoute from './features/routes/ProtectedRoute'
import { useSelector } from 'react-redux'
import AutoLogout from './features/AutoLogout'
import MessagePage from './components/MessagePage'
import { useEffect } from 'react'

const App = () => {

  const { isAuthenticated } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.feature);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const router = createBrowserRouter([
    { index: true, element: <Home /> },

    {
      element: <PublicRoute />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
      ]
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/chat', element: <ChatPage />,
          children: [
            {
              path: '/chat/:userId',
              element: <MessagePage />
            }
          ]
        },
      ]
    },

  ])


  return <>
    <RouterProvider router={router} >
      {isAuthenticated && <AutoLogout />}
    </RouterProvider>
  </>

}
export default App