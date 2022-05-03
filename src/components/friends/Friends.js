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

    // FETCHES ALL USER OBJECTS FROM DB AND SETS USERS USESTATE  
    const getUsers = () => {
        getAllUsers().then((usersFromApi) => {
            setUsers(usersFromApi)
        })
    }

    // LOOPS THE FRIENDS USESTATE AND PUSHES THE USERID TO A NEW ARRAY THEN PUSHES THE SESSION STORAGE ID TO THE SAME ARRAY
    // CREATES A VARIABLE  THAT FILTERINGS THE USERS USESTATE AND RETURNS ANYTHING THAT ISNT INCLUDED IN THE NEW ARRAY WE JUST MADE
    const filterUsersThatArentFriends = () => {
        let friendIdArr = []
        friends.forEach((i) => {
            friendIdArr.push(i.userId)
        })

        friendIdArr.push(JSON.parse(sessionStorage.getItem("encounter_user")).id)


        const filter = users.filter((user) => {

            return !friendIdArr.includes(user.id)
        })
        return filter

    }

    // WHEN ONCHANGE OF THE TEXT INPUT FOR "SEARCH FOR A USER" HAPPENS THIS TAKES IN THE VALUE AND SETS IT TO THE SEARCHINPUT USESTATE 
    // AS LONG AS SEARCHNPUT IS NOT AN EMPTY STRING IT WILL FILTER THE FILTEREDUSERSTHATARENTFRIENDS ARRAY TO SEE IF ANY OF THEM HAVE MATCHING VALUES WITH SEARCHINPUT AND SETS THE FILTEREDUSERARRAY WITH THE MATCHING USERS
    // IF SEARCHINPUT IS AN EMPTY STRING THE FILTEREDUSERARRAY GETS SET TO ALL FILTERUSERSTHATARENTFRIENDS
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredUsers = filterUsersThatArentFriends().filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredUserArr(filteredUsers)
        }
        else {
            setFilteredUserArr(filterUsersThatArentFriends())
        }
    }

    // REMOVES A FRIEND OBJECT IN THE DB BASED ON A SPECIFIC ID THEN FETCHES THE ARRAY OF FRIEND OBJECTS AND RESETS THE STATE 
    const handleDeleteFriend = (id) => {
        deleteFriend(id)
            .then(() =>
                getFriends()
            )
    }

    // ADDS A FRIEND OBJECT TO THE DB BASED ON BOTH USER IDS THEN CALLS GETFRIENDS, SETS THE SEARCHINPUT STATE TO AN EMPTY STRING AS WELL AS THE TEXT BOX'S INPUT VALUE
    const handleAddFriend = (friendId) => {
        const friendObj = {
            userId: friendId,
            currentUserId: JSON.parse(sessionStorage.getItem("encounter_user")).id
        }
        addFriend(friendObj).then(() => {
            getFriends()
            setSearchInput('')
            document.getElementById("searchInput").value = ""
        })

    }

    // WHEN THE PAGE INITIALLY LOADS THIS CALLS THE GETUSERS AND GETFRIENDS FUNCTION
    useEffect(() => {
        getFriends()
        getUsers()
    }, [])

    return (
        <>
            <div className="friendForm">
                <section className="friendSearch">
                    <h1>Search for Friends to add:</h1>
                    <section className="searchInput">
                        <input id="searchInput" type="text" placeholder="Search for a User"
                            onChange={(e) => searchItems(e.target.value)} ></input>
                    </section>
                    {/* TERNARY STATEMENT IF SEARCH INPUT IS GREATER THAN 1 RENDER THE FRIENDSEARCHRESULT USING FILTEREDUSERARR ELSE RENDER IT WITH USERS ARRAY */}
                    <section className="friendSearchContainer">{searchInput.length > 1 ?
                        filteredUserArr.map((singleResult) => {
                            return (<FriendSearchResult
                                key={singleResult.id}
                                singleResult={singleResult}
                                handleAddFriend={handleAddFriend}
                            />)
                        }
                        ) : ""}

                    </section>
                </section>
                <section className="FriendList">
                    <h1>Your Friend List:</h1>
                    {/* RENDERS THE FRIENDCARD BASED OFF THE FRIENDS USESTATE */}
                    <section>
                        <section className="friendContainer">
                            {friends.map(friend => {
                                return <FriendCard
                                    key={friend.id}
                                    singleFriendUser={friend}
                                    handleDeleteFriend={handleDeleteFriend} />;
                            })

                            }
                        </section>
                    </section>
                </section>
            </div>
        </>
    )

}