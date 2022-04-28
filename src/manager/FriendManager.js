// RETURNS AN ARRAY OF FRIENDS BASED OF A SINGLE USER ID
export const getFriendsByCurrentUserId = (currentUserId) => {
    return fetch(`http://localhost:8088/friends?currentUserId=${currentUserId}&_expand=user`)
        .then(res => res.json())
}

// REMOVES A FRIEND OBJECT FROM THE DB BASED ON THE OBJECT ID
export const deleteFriend = (friendId) => {
    return fetch(`http://localhost:8088/friends/${friendId}`, {
        method: "DELETE"
    }).then(result => result.json())
}

// ADDS A NEW FRIEND OBJECT TO THE DB 
export const addFriend = (newFriend) => {
    return fetch('http://localhost:8088/friends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFriend)
    }).then(response => response.json())
}