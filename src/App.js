import { useState } from "react";
import { ApplicationView } from "./components/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { FooterCard } from "./components/footer/Footer"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("encounter_user") !== null)

  const setAuthUser = (user) => {
    sessionStorage.setItem("encounter_user", JSON.stringify(user))
    setIsAuthenticated(sessionStorage.getItem("encounter_user") !== null)
  }

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <ApplicationView setAuthUser={setAuthUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <FooterCard isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
