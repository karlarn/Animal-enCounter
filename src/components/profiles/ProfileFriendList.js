import { Link } from "react-router-dom"

// FRIEND LIST FOR PROFILECARDJS
export const ProfileFriendList = ({ singleFriend }) => {

    return (
        <>
            <div className="card">
                <div className="currentFriendCardContent">
                    <h3 className="friendName">{singleFriend.user.firstName} {singleFriend.user.lastName}</h3>
                    <p>{singleFriend.user.email}</p>
                    {/* CHECKS TO SEE IF SINGLEFRIENDUSER IS THE LOGGED IN USER AND LINKS TO THE HOME PAGE INSTEAD OF A PROFILE PAGE */}
                    {singleFriend.user.id === JSON.parse(sessionStorage.getItem("encounter_user")).id ? <Link to={`/home`}>
                        <button>View My Profile</button>
                    </Link> : <Link to={`/profile/${singleFriend.user.id}`}>
                        <button>View Profile</button>
                    </Link>}

                </div>
            </div>
        </>
    )
}

