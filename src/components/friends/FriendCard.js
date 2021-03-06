import { Link } from "react-router-dom"
// CARD FOR FRIENDSJS TO RENDER THE USERS FRIENDS
export const FriendCard = ({ singleFriendUser, handleDeleteFriend }) => {

  return (
    <>
      <div className="currentFriendCardContent">
        <h3 className="friendName">{singleFriendUser.user.firstName} {singleFriendUser.user.lastName}</h3>
        <p>{singleFriendUser.user.email}</p>
        <Link to={`/profile/${singleFriendUser.user.id}`}>
          <button>View Profile</button>
        </Link>
        <button
          type="button"
          onClick={() => handleDeleteFriend(singleFriendUser.id)} >
          Delete
        </button>
      </div>
    </>
  )
}