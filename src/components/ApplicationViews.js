import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { HomeCard } from "./home/home"
import { AnimalEntryCard } from "./entry/Entry"
import { Leaderboard } from "./leaderboard/Leaderboard"
import { FriendComponent } from "./friends/Friends"
import { EditAnimalForm } from "./entry/EditAnimalEntry"
import { ProfileCard } from "./profiles/ProfileCard"

export const ApplicationView = ({ setAuthUser, isAuthenticated }) => {
  const PrivateOutlet = () => {
    return isAuthenticated ? <Outlet /> : <Navigate path="/login" />
  }



  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>

          <Route path="home" element={<HomeCard />} />

          <Route path="animal" element={<AnimalEntryCard />} />
          <Route path="animal/:animalId/edit" element={<EditAnimalForm />} />

          <Route path="leaderboard" element={<Leaderboard />} />

          <Route path="friends" element={<FriendComponent />} />

          <Route path="profile/:userId" element={<ProfileCard />} />

        </Route>
        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/register" element={<Register setAuthUser={setAuthUser} />} />
      </Routes>
    </>
  )
}