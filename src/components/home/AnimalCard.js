import { Link } from "react-router-dom"

// CARD FOR HOMEJS TO RENDER THE USERS ANIMALS 
export const AnimalCard = ({ singleAnimal }) => {
    return (
        <>
            <div className="animalCard">
                <h2 className="animalHeader">{singleAnimal.name} </h2>
                <p className="animalP">XP: {singleAnimal.xp}</p>
                <p className="animalP">Date: {singleAnimal.date.slice([0], [10])}</p>
                <p className="animalP">EnCounter location: {singleAnimal.where}</p>
                <p className="animalP">Behavior:{singleAnimal.behavior} </p>
                {/* TAKES YOU TO THE EDIT ANIMAL FORM WITH THE SPECIFIC ANIMAL ID */}
                <Link className="animalLink" to={`/animal/${singleAnimal.id}/edit`}>
                    <button>Edit</button>
                </Link>
            </div>
        </>
    )
}