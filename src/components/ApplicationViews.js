import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Home } from "./home/home"

export const ApplicationView=({ isAuthenticated, setIsAuthenticated })=>{

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("encounter_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("encounter_user") !== null)
    }


    return (
        <>
            <Routes>
                <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route exact path="/register" element={<Register setAuthUser={setAuthUser} />} /> 

                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} /> 
            </Routes>
        </>
        
    )
}