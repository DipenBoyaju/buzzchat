import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "../slices/authSlice";
import { persistor } from "../app/store";
import SessionEnd from "../components/SessionEnd";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const { expiresAt } = useSelector((state) => state.auth)
  console.log(expiresAt);


  useEffect(() => {
    if (expiresAt) {
      const timeLeft = expiresAt - Date.now();


      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          dispatch(removeCredentials())
          persistor.purge();
        }, timeLeft);

        return () => clearTimeout(timer)
      }
    }
  }, [expiresAt, dispatch, nav])

  return (
    <div className="w-full h-full absolute">
      <SessionEnd />
    </div>
  )
}
export default AutoLogout