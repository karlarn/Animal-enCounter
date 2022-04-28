import { getAnimalById, updateAnimal } from "../../manager/AnimalManager"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const EditAnimalForm = () => {
    // SETS AN EMPTY OBJECT
    const [animal, setAnimal] = useState({ name: "", where: "", behavior: "" })

    // GETS THE ID OF A SPECIFIC ANIMAL OBJECT BASED OFF THE URL
    const { animalId } = useParams();

    // NAVIGATES TO A DIFFERENT SPECIFIED ROUTE
    const navigate = useNavigate();

    // WATCHES A VALUE AND UPDATES THE STATE IF THE INPUT CHANGES 
    const handleFieldChange = evt => {
        const stateToChange = { ...animal };
        stateToChange[evt.target.id] = evt.target.value;
        setAnimal(stateToChange);
    };

    // CREATES AN OBJECT BASED ON THE STATE OF "ANIMAL" AND PATCHES THE OBJECT IN THE DB THEN NAVIGATES TO HOME
    const updateExistingAnimal = evt => {
        evt.preventDefault()

        const editedAnimal = {
            id: animalId,
            name: animal.name,
            where: animal.where,
            behavior: animal.behavior
        };

        updateAnimal(editedAnimal)
            .then(() => navigate("/home")
            )
    }

    // WHEN THE PAGE LOADS IT FETCHES A SPECIFIC ANIMAL OBJECT BASED ON USEPARAMS AND SETS IT TO THE USESTATE. WILL RERENDER IF THE ANIMALID IN THE USEPARAMS CHANGES.
    useEffect(() => {
        getAnimalById(animalId)
            .then(animalObj => {
                setAnimal(animalObj);
            });
    }, [animalId]);


    return (
        <form className="animalEntryForm">
            <h1>Would you like to edit your {animal.name}?</h1>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">What Kind of animal did you see?</label>
                    <input type="text" id="name" onChange={handleFieldChange} required placeholder="Animal name" value={animal.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="where">Where did you see the animal?</label>
                    <input type="text" id="where" onChange={handleFieldChange} required placeholder="Location description" value={animal.where} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="behavior">Was this animal domestic or wild?</label><br />
                    <input type="radio" onChange={handleFieldChange} value="Domestic"
                        checked={animal.behavior === "Domestic"} name="behavior" id="behavior" /> Domestic <br />
                    <input type="radio" onChange={handleFieldChange} value="Wild" checked={animal.behavior === "Wild"} name="behavior" id="behavior" /> Wild
                </div>
            </fieldset>

            <button type="button" className="btn btn-primary"
                onClick={updateExistingAnimal}>
                Update enCounter
            </button>
            <Link to={`/home`}>
                <button>Cancel</button>
            </Link>
        </form>
    )

}