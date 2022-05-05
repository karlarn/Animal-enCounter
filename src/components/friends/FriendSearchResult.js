// CARD FOR FRIENDSJS TO RENDER THE USERS FRIEND SEARCH
export const FriendSearchResult = ({ singleResult, handleAddFriend }) => {

  return (
    <>
      <div className="friendSearchCardContent">
        <h3 className="friendName">{singleResult.firstName} {singleResult.lastName}</h3>
        <p>{singleResult.email}</p>
        <button
          type="button"
          onClick={() => handleAddFriend(singleResult.id)} >
          Add Friend
        </button>
      </div>
    </>
  )
}