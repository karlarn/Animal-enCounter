import { Link } from "react-router-dom"
// CARD FOR LEADERBOARD.JS TO POPULATE EACH USER BASED ON THEIR TOTAL XP SCORE
export const LeaderboardCard = ({ singleUser }) => {
    return (
        <>
            <div className="card">
                <div className="cardContent">
                    <h3>{singleUser.firstName} {singleUser.lastName}</h3>
                    <p>{singleUser.totalXp} TOTAL XP</p>
                    {/* CHECKS TO SEE IF THE SINGLE USER IS THE LOGGED IN USER AND LINKS TO THE HOME PAGE INSTEAD OF A PROFILE PAGE */}
                    {singleUser.id === JSON.parse(sessionStorage.getItem("encounter_user")).id ? <Link to={`/home`}>
                        <button>View My Profile</button>
                    </Link> : <Link to={`/profile/${singleUser.id}`}>
                        <button>View Profile</button>
                    </Link>}
                </div>
            </div>
        </>
    )

}