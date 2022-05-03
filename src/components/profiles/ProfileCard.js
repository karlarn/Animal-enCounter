import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAnimalByUserId } from "../../manager/AnimalManager"
import { getUserById } from "../../manager/UserManager"
import { getFriendsByCurrentUserId } from "../../manager/FriendManager"
import { ProfileFriendList } from "./ProfileFriendList"
import { AnimalList } from "./ProfileAnimalList"

export const ProfileCard = () => {
    // SETS THE STATE OF THE USER TO AN EMPTY OBJECT TO START
    const [user, setUser] = useState({})

    // SETS THE STATE OF THE USERS ANIMALS TO AN EMPTY ARRAY START
    const [userAnimals, setUserAnimals] = useState([])

    // SETS THE STATE OF USERS FRIENDS TO AN EMPTY ARRAY TO START
    const [userFriends, setUserFriends] = useState([])

    // TAKES IN A PORTION OF THE URL TO RENDER SPECIFIC INFORMATION TO THE USER IN QUESTION
    const { userId } = useParams()

    // FUNCTION TO SET THE STATE OF THE USER
    const getUserForProfile = (userId) => {
        getUserById(userId).then((userFromApi) => {
            setUser(userFromApi)
        })
    }

    // FUNCTION TO SET THE STATE OF THE USERS ANIMALS
    const getProfileUsersAnimals = (userId) => {
        getAnimalByUserId(userId).then((animalsFromApi) => {
            setUserAnimals(animalsFromApi)
        })
    }

    // FUNCTION TO SET THE STATE OF THE USERS FRIENDS
    const getProfileUsersFriends = (userId) => {
        getFriendsByCurrentUserId(userId).then((friendsFromApi) => {
            setUserFriends(friendsFromApi)
        })
    }

    // LOOPS THE USERANIMALS STATE AND ADDS ALL THE XP TO A SINGLE VARIABLE  
    const xpCounter = () => {
        let accumulatedXp = 0
        userAnimals.forEach((animalObj) => {
            accumulatedXp = accumulatedXp + animalObj.xp
        })
        return accumulatedXp
    }

    // WHEN THE PAGE LOADS THIS USES THREE FUNCTIONS WITH USEPARAMS TO FETCH ALL INFORATION NEEDED FOR THE PAGE. WILL RELOAD IF THE USERID IN USEPARAMS EVER CHANGES
    useEffect(() => {
        getUserForProfile(userId)
        getProfileUsersAnimals(userId)
        getProfileUsersFriends(userId)
    }, [userId])


    return (
        <>
            <section className="profileHeader">
                <h1>Welcome to {user.firstName}'s Profile!</h1>
                <h2>They are on a roll with {xpCounter()} total XP!</h2>
                <h1>{user.firstName}'s Friends:</h1>
            </section>
            <section className="friendContainer">
                {userFriends.map(friend => {
                    return <ProfileFriendList
                        key={friend.id}
                        singleFriend={friend}
                    />;
                })

                }
            </section>
            <section className="profileHeader">
                <h1>{user.firstName}'s Animals:</h1>
            </section>
            <div className="animalList">
                {userAnimals.map(animal => {
                    return <AnimalList
                        key={animal.id}
                        singleAnimal={animal} />
                })}
            </div>

        </>
    )
}