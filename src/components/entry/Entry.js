import { addAnimal } from "../../manager/AnimalManager"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const AnimalEntryCard=()=>{
    const [ animal, setAnimal] = useState({
        name: "",
        where: "",
        date: new Date().toISOString(),
        xp: "",
        userId: JSON.parse(sessionStorage.getItem("encounter_user")).id
    })
    const navigate= useNavigate()

     const handleControlledInputChange = (event) => {
		
		const newAnimal = { ...animal }
		let selectedVal = event.target.value

        newAnimal[event.target.id] = selectedVal
		
		setAnimal(newAnimal)
	}

    const handleClickSaveAnimal = (event) => {
		event.preventDefault()

			addAnimal(animal)
				.then(() => navigate("/home"))
		
	}


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
            <button type="button" className="btn btn-primary"
				onClick={handleClickSaveAnimal}>
				Add Animal
          </button>
        </form>
    )
}