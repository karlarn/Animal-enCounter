import { Link } from "react-router-dom"

// CARD FOR HOMEJS TO RENDER THE USERS ANIMALS 
export const AnimalCard = ({ singleAnimal }) => {
    return (
        <>
            <h2>{singleAnimal.name}</h2>
            <p>{singleAnimal.date}</p>
            <p>{singleAnimal.xp}</p>
            <p>{singleAnimal.behavior}</p>
            {/* TAKES YOU TO THE EDIT ANIMAL FORM WITH THE SPECIFIC ANIMAL ID */}
            <Link to={`/animal/${singleAnimal.id}/edit`}>
                <button>Edit</button>
            </Link>
        </>
    )
}