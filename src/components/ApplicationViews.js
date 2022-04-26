import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { HomeCard } from "./home/home"
import { AnimalEntryCard } from "./entry/Entry"
import { LeaderboardCard } from "./leaderboard/Leaderboard"
import { FriendComponent } from "./friends/Friends"
import { EditAnimalForm } from "./entry/EditAnimalEntry"

export const ApplicationView = ({ setAuthUser, isAuthenticated }) => {
  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  }

 

  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>

          <Route  path="home" element={<HomeCard />} />

          <Route path="animal" element={<AnimalEntryCard/>} />
          <Route path="animal/:animalId/edit" element={<EditAnimalForm/>} />

          <Route path="leaderboard" element={<LeaderboardCard/>} />

          <Route path="friends" element={<FriendComponent/>} />

        </Route>



        <Route  path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route  path="/register" element={<Register setAuthUser={setAuthUser} />} />


      </Routes>
    </>

  )
}