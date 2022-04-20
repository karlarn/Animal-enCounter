import { useState } from "react";
import { ApplicationView } from "./components/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("encounter_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("encounter_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("encounter_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("encounter_user") !== null)
      }

  return (
    <>
    <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
    <ApplicationView setAuthUser={setAuthUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
    </>
  );
}

export default App;
