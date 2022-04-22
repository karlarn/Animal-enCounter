import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Home } from "./home/home"

export const ApplicationView = ({ isAuthenticated, setIsAuthenticated }) => {
    const PrivateOutlet = () => {
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }
  
    const setAuthUser = (user) => {
      sessionStorage.setItem("enounter_user", JSON.stringify(user))
      setIsAuthenticated(sessionStorage.getItem("encounter_user") !== null)
    }

    return (
        <>
            <Routes>
                <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route exact path="/register" element={<Register setAuthUser={setAuthUser} />} /> 

                <Route exact path="/" element={<PrivateOutlet><Home /></PrivateOutlet>} /> 
            </Routes>
        </>
        
    )
}