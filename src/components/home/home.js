import { useState, useEffect } from "react"
import { getAnimalById } from "../../manager/AnimalManager"
import { AnimalCard } from "./AnimalCard"

export const HomeCard= ()=>{
    const [ animals , setAnimals] = useState([])

    const getUserAnimals=(id)=>{
        getAnimalById(id).then((animalArr)=>setAnimals(animalArr))
    }

    const xpCounter=()=>{
        let accumulatedXp=0
        animals.map((animalObj)=>{
            accumulatedXp= accumulatedXp + animalObj.xp
        })
        return accumulatedXp
    }

    useEffect(()=>{
        getUserAnimals(JSON.parse(sessionStorage.getItem("encounter_user")).id)
    }, [])
    return (
        <>
        <h1>Welcome, {JSON.parse(sessionStorage.getItem("encounter_user")).firstName}!<br/> You have so much XP, {xpCounter()}, to be exact!</h1>
        <h3>Want more? add an entry</h3>
        <div>
        <h3>Checkout the animals you've already seen!</h3>
        {animals.map((animal)=>(<AnimalCard
            key={animal.id}
            singleAnimal={animal} />))}
        </div>
        <h3></h3>
        </>
    )
}