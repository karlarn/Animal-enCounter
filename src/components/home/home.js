import { useState, useEffect } from "react"
import { getAnimalByUserId } from "../../manager/AnimalManager"
import { AnimalCard } from "./AnimalCard"

export const HomeCard = () => {
    // CREATES AN EMPTY ARRAY OF ANIMALS
    const [animals, setAnimals] = useState([])

    // FETCHES THE ANIMALS CREATED BY THE ID WE PASS TO IT 
    const getUserAnimals = (id) => {
        getAnimalByUserId(id).then((animalArr) => setAnimals(animalArr))
    }

    // LOOPS THROUGH AN ARRAY OF ANIMALS ADDS THE "XP" TO ONE VARIABLE AND RETURNS IT
    const xpCounter = () => {
        let accumulatedXp = 0
        animals.forEach((animalObj) => {
            accumulatedXp = accumulatedXp + animalObj.xp
        })
        return accumulatedXp
    }

    // WHEN THE PAGE LOADS THIS GETS THE LOGGED IN USER AND PASSES IT TO GETUSERANIMALS TO SET ONLY THE ANIMALS OF THAT USER
    useEffect(() => {
        getUserAnimals(JSON.parse(sessionStorage.getItem("encounter_user")).id)
    }, [])
    return (
        <>
            <h1>Welcome, {JSON.parse(sessionStorage.getItem("encounter_user")).firstName}!<br /> You have so much XP, {xpCounter()}, to be exact!</h1>
            <h3>Want more? add an entry</h3>
            <div>
                <h3>Checkout the animals you've already seen!</h3>
                {animals.map((animal) => (<AnimalCard
                    key={animal.id}
                    singleAnimal={animal} />))}
            </div>

        </>
    )
}