import { getAllUsers } from "../../manager/UserManager"
import { getFriendsByCurrentUserId, deleteFriend, addFriend } from "../../manager/FriendManager"
import { FriendSearchResult } from "./FriendSearchResult"
import { FriendCard } from "./FriendCard"
import { useEffect, useState } from "react"


export const FriendComponent = () => {
    // STARTS BY SETTING AN EMPTY ARRAY WILL BE POPULATED WITH CURRENT USERS FRIENDS AFTER USEEFFECT
    const [friends, setFriends] = useState([])

    // STARTS BY SETTING AN EMPTY ARRAY WILL BE POPULATED WITH ALL USERS AFTER USEEFFECT
    const [users, setUsers] = useState([])

    // STARTS BY SETTING AN EMPTY STRING WILL BE POPULATED WHEN USER TYPES INTO THE SEARCH INPUT
    const [searchInput, setSearchInput] = useState('')

    // STARTS BY SETTING AN EMPTY ARRAY WILL BE POPULATED BY USERS WHO MATCH UP WITH SEARCH INPUT
    const [filteredUserArr, setFilteredUserArr] = useState([])

    // FETCHES AN ARRAY OF FRIEND OBJECTS BASED OFF THE USER ID THEN SETS THEM TO USESTATE
    const getFriends = () => {
        getFriendsByCurrentUserId(JSON.parse(sessionStorage.getItem("encounter_user")).id).then((friendsFromApi) => {
            setFriends(friendsFromApi)
        })
    }
    
    // FETCHES AN ARRAY OF USER OBJECTS AND SETS USERS USESTATE  
    const getUsers = () => {
        getAllUsers().then((usersFromApi) => { setUsers(usersFromApi) })
    }

    // WHEN ONCHANGE OF THE TEXT INPUT FOR "SEARCH FOR A USER" HAPPENS THIS TAKES IN THE VALUE AND SETS IT TO THE SEARCHINPUT USESTATE 
    // AS LONG AS SEARCHNPUT IS NOT AN EMPTY STRING IT WILL FILTER ALL THE USERS TO SEE IF ANY OF THEM HAVE MATCHING VALUES WITH SEARCHINPUT AND SETS THE FILTEREDUSERARRAY WITH THE MATCHING USERS
    // IF SEARCHINPUT IS AN EMPTY STRING THE FILTEREDUSERARRAY GETS SET TO ALL USERS 
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredUsers = users.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredUserArr(filteredUsers)
        }
        else {
            setFilteredUserArr(users)
        }
    }

    // REMOVES A FRIEND OBJECT IN THE DB BASED ON A SPECIFIC ID THEN FETCHES THE ARRAY OF FRIEND OBJECTS AGAIN AND RESETS THE STATE 
    const handleDeleteFriend = (id) => {
        deleteFriend(id)
            .then(() => getFriendsByCurrentUserId(JSON.parse(sessionStorage.getItem("encounter_user")).id)
                .then((friendList) => setFriends(friendList))
            )
    }

    // ADDS A FRIEND OBJECT TO THE DB BASED ON BOTH USER IDS THEN CALLS GETFRIENDS
    const handleAddFriend = (friendId) => {
        const friendObj = {
            userId: friendId,
            currentUserId: JSON.parse(sessionStorage.getItem("encounter_user")).id
        }
        addFriend(friendObj).then(() => { getFriends() })

    }

    // WHEN THE PAGE INITIALLY LOADS THIS CALLS THE GETUSERS FUNCTION
    useEffect(() => {
        getUsers()
    }, [])

    // WHEN THE PAGE INITIALLY LOADS THIS CALLS THE GETFRIENDS FUNCTION 
    useEffect(() => {
        getFriends()
    }, [])

    return (
        <>
            <h1>Want to look for more friends to add?</h1>
            <section className="searchInput">
                <input type="text" placeholder="Search for a User"
                    onChange={(e) => searchItems(e.target.value)} ></input>
            </section>
            {/* TERNARY STATEMENT IF SEARCH INPUT IS GREATER THAN 1 RENDER THE FRIENDSEARCHRESULT USING FILTEREDUSERARR ELSE RENDER IT WITH USERS ARRAY */}
            <section>{searchInput.length > 1 ?
                filteredUserArr.map((singleResult) => {
                    return (<FriendSearchResult
                        key={singleResult.id}
                        singleResult={singleResult}
                        handleAddFriend={handleAddFriend}
                    />)
                }
                ) : users.map((singleResult) => {
                    return (<FriendSearchResult
                        key={singleResult.id}
                        singleResult={singleResult}
                        handleAddFriend={handleAddFriend}
                    />)
                })}

            </section>
            <h1>Take a look at all the friends you've accumulated!</h1>
            {/* RENDERS THE FRIENDCARD BASED OFF THE FRIENDS USESTATE */}
            <div className="container-cards">
                {friends.map(friend => {
                    return <FriendCard
                        key={friend.id}
                        singleFriendUser={friend}
                        handleDeleteFriend={handleDeleteFriend} />;
                })

                }
            </div>
        </>
    )

}