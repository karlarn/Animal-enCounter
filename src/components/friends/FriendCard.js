// CARD FOR FRIENDSJS TO RENDER THE USERS FRIENDS
export const FriendCard = ({singleFriendUser, handleDeleteFriend}) => {

    return (
      <>
        <div className="card">
          <div className="cardContent">
            <h3>{singleFriendUser.user.firstName} {singleFriendUser.user.lastName}</h3>
            <p>{singleFriendUser.user.email}</p>
            <button
              type="button"
              onClick={() => handleDeleteFriend(singleFriendUser.id)}
              >
              Delete
            </button>
          </div>
        </div>
      </>
    )

}