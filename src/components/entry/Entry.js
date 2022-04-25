import { addAnimal } from "../../manager/AnimalManager"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const AnimalEntryCard = () => {

    // SETS THE INITIAL ANIMAL AND CREATES THE XP NUMBER
    const [animal, setAnimal] = useState({
        name: "",
        where: "",
        behavior: "",
        date: new Date().toISOString(),
        xp: Math.floor(Math.random() * 10 + 1),
        userId: JSON.parse(sessionStorage.getItem("encounter_user")).id
    })

    const navigate = useNavigate()

    // WHEN 'CHANGE' HAPPENS IN THE FORM THE VALUE IS CHANGED IN THE OBJECT
    const handleControlledInputChange = (event) => {

        const newAnimal = { ...animal }
        let selectedVal = event.target.value

        newAnimal[event.target.id] = selectedVal

        setAnimal(newAnimal)
    }
    // WHEN THE ADD ANIMAL BUTTON IS CLICKED THE ANIMAL OBJECT IN THE USESTATE IS SAVED WITH A FETCH CALL TO THE ANIMALS ARRAY IN THE API. THE USER RECIEVES AN ALERT AND ONCE THEY CLICK "OK" THEY NAVIGATE TO THE HOME PAGE. 
    const handleClickSaveAnimal = (event) => {
        event.preventDefault()

        addAnimal(animal)
            .then(() => {
                alert(`You added ${animal.name} to your enCounter list and gained ${animal.xp} XP!`)
            })
            .then(() => { navigate("/home") })

    }

    // ANIMAL ENTRY FORM
    return (
        <form className="animalEntryForm">
            <h1>Add an animal to your profile:</h1>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">What Kind of animal did you see?</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required placeholder="Animal name" value={animal.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="where">Where did you see the animal?</label>
                    <input type="text" id="where" onChange={handleControlledInputChange} required placeholder="Location description" value={animal.where} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="behavior">Was this animal domestic or wild?</label><br />
                    <input type="radio" onChange={handleControlledInputChange} value="Domestic" name="behavior" id="behavior" /> Domestic <br />
                    <input type="radio" onChange={handleControlledInputChange} value="Wild" name="behavior" id="behavior" /> Wild
                </div>
            </fieldset>

            <button type="button" className="btn btn-primary"
                onClick={handleClickSaveAnimal}>
                Add Animal
            </button>
        </form>
    )
}