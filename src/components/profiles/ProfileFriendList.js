import { Link } from "react-router-dom"

// FRIEND LIST FOR PROFILECARDJS
export const ProfileFriendList = ({ singleFriend }) => {

    return (
        <>
            <div className="card">
                <div className="cardContent">
                    <h3>{singleFriend.user.firstName} {singleFriend.user.lastName}</h3>
                    <p>{singleFriend.user.email}</p>
                    <Link to={`/profile/${singleFriend.user.id}`}>
                        <button>View Profile</button>
                    </Link>
                </div>
            </div>
        </>
    )
}