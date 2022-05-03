import { Link } from "react-router-dom"

export const NavBar = () => {

    // CLEARS SESSION STORAGE 
    const Logout = () => {
        sessionStorage.removeItem("encounter_user")
    }

    // SERIES OF LINKS IN A NAVBAR THAT MOVES YOU TO DIFFERENT VIEWS OF THE APP 
    return (
        <>

            <nav>
                <picture>
                    <img className="pandaLogo" src={"/images/pandaLogo.png"} alt="Panda Waving Logo" />
                </picture>
                <ul>
                    <li>
                        <Link className="nav-link" to="/home">Profile</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/animal">Animal Entry</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/login" onClick={() => { Logout() }}>Logout</Link>
                    </li>
                </ul>
            </nav>

        </>
    )
}