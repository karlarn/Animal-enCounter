import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Home } from "./home/Home"

export const ApplicationView = ({ setAuthUser, isAuthenticated }) => {
  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }

 

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route  path="home" element={<Home />} />
        </Route>



        <Route  path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route  path="/register" element={<Register setAuthUser={setAuthUser} />} />


      </Routes>
    </>

  )
}