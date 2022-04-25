import { getAnimalById } from "../../manager/AnimalManager"

export const HomeCard= ()=>{
    return (
        <>
        <h1>{JSON.parse(sessionStorage.getItem("encounter_user")).name}'s Profile</h1>
        <h3>you've got so much XP!</h3>
        <h3>Want more? add an entry</h3>
        <h3>Checkout the animals you've already seen!</h3>
        <h3></h3>
        </>
    )
}