// CARD FOR LEADERBOARD.JS TO POPULATE EACH USER BASED ON THEIR TOTAL XP SCORE
export const LeaderboardCard = ({ singleUser }) => {
    return (
        <>
            <div className="card">
                <div className="cardContent">
                    <h3>{singleUser.firstName} {singleUser.lastName}</h3>
                    <p>{singleUser.totalXp}</p>
                </div>
            </div>
        </>
    )

}