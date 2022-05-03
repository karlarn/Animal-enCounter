import { getAllUsers } from "../../manager/UserManager"
import { getAllAnimals } from "../../manager/AnimalManager"
import { LeaderboardCard } from "./LeaderboardCard"
import { useState, useEffect } from "react"

export const Leaderboard = () => {
    // INITIALLY SETS THE STATE OF ANIMALS TO AN EMPTY ARRAY WILL EVENTUALLY BE POPULATED BY ALL THE ANIMALS IN THE DB
    const [animals, setAnimals] = useState([])

    // INITIALLY SETS THE STATE OF USERS TO AN EMPTY ARRAY WILL EVENTUALLY BE POPULTED BY ALL THE USERS IN THE DB
    const [users, setUsers] = useState([])

    // FUNCTION TO FETCH ALL THE USERS FROM THE DB AND SET THE STATE 
    const getUsers = () => {
        getAllUsers().then((usersFromApi) => {
            setUsers(usersFromApi)
        })
    }

    // FUNCTION TO FETCH ALL THE ANIMALS FROM THE DB AND SET THE STATE 
    const getAnimals = () => {
        getAllAnimals().then((animalsFromApi) => {
            setAnimals(animalsFromApi)
        })
    }

    // TAKES IN AN ARGUMENT OF A USER ID AND LOOPS THROUGH ALL THE ANIMALS SAVED IN STATE IF THE IDS MATCH UP THE ANIMAL XP GETS ADDED TO A TOTAL XP VARIABLE THE FUNCTION RETURNS THE TOTAL XP OF THE MATCHING USER
    const calculateXp = (userId) => {
        let totalXp = 0
        animals.forEach((animalObj) => {
            if (animalObj.userId === userId) {
                totalXp = totalXp + animalObj.xp
            }
        })
        return totalXp
    }

    // LOOPS THROUGH THE USERS SAVED IN STATE AND CREATES A NEW ARRAY FOR EACH OBJECT TO BE PUSHED INTO WITH AN ADDITION OF TOTAL XP
    const userArrWithXp = () => {
        let newUserArr = []
        users.forEach((user) => {
            newUserArr.push({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                totalXp: calculateXp(user.id)
            })
        })
        return newUserArr
    }

    // ARRAY TO POST PLACEMENT BESIDE EACH TOP FIVE OBJECT
    const placeArr = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"]

    // SORTS AN ARRAY OF OBJECTS BASED ON THEIR TOTAL XP NUMBER
    const sortedArr = userArrWithXp().sort((a, b) => { return b.totalXp - a.totalXp })

    // CREATES AN ARRAY OF TOP FIVE XP USERS BY SLICING THE SORTED ARRAY
    const topFive = sortedArr.slice([0], [5])

    // WHEN THE PAGE LOADS GETANIMALS IS CALLED 
    useEffect(() => {
        getAnimals()
    }, [])

    // WHEN THE PAGE LOADS GETUSERS IS CALLED 
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <h1 className="leaderHeader">Top Five EnCounter Players:</h1>
            <section className="leaderCardPage">
                <section className="placingTiles">
                    {placeArr.map(place =>
                        <p className="placement" key={place}>{place}</p>
                    )}
                </section>
                <div className="leaderCardContainer">
                    {topFive.map(user =>
                        <LeaderboardCard
                            key={user.id}
                            singleUser={user}
                        />
                    )}
                </div>
                <aside className="goatDab">
                    <img className="goat" src={"/images/goatDabbing.png"} alt="GOAT Dabbing" />
                </aside>
            </section>
        </>
    )
}