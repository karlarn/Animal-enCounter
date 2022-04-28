import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAnimalByUserId } from "../../manager/AnimalManager"
import { getUserById } from "../../manager/UserManager"
import { getFriendsByCurrentUserId } from "../../manager/FriendManager"
import { ProfileFriendList } from "./ProfileFriendList"
import { AnimalList } from "./ProfileAnimalList"

export const ProfileCard=()=>{
    const [ user, setUser]= useState({})

    const [ userAnimals, setUserAnimals ]= useState([])

    const [ userFriends, setUserFriends ]= useState([])

    const {userId}=useParams()

    const getUserForProfile=(userId)=>{
        getUserById(userId).then((userFromApi)=>{
            setUser(userFromApi)
        })
    }

    const getProfileUsersAnimals=(userId)=>{
        getAnimalByUserId(userId).then((animalsFromApi)=>{
            setUserAnimals(animalsFromApi)
        })
    }

    const getProfileUsersFriends=(userId)=>{
        getFriendsByCurrentUserId(userId).then((friendsFromApi)=>{
            setUserFriends(friendsFromApi)
        })
    }

    const xpCounter = () => {
        let accumulatedXp = 0
        userAnimals.forEach((animalObj) => {
            accumulatedXp = accumulatedXp + animalObj.xp
        })
        return accumulatedXp
    }

    useEffect(()=>{
        getUserForProfile(userId)
        getProfileUsersAnimals(userId)
        getProfileUsersFriends(userId)
    }, [userId])


    return (
        <>
        <h1>Checkout {user.firstName}'s Profile!</h1>
        <h2>They are on a roll with {xpCounter()} total XP!</h2>
        <h1>All of {user.firstName}'s Friends:</h1>
        {userFriends.map(friend => {
                    return <ProfileFriendList
                        key={friend.id}
                        singleFriend={friend}
                        />;
                })

                }
        <h1>All of {user.firstName}'s Animals:</h1>
        {userAnimals.map(animal=>{
            return <AnimalList
            key={animal.id}
            singleAnimal={animal}/>
        })}
        
        </>
    )
}