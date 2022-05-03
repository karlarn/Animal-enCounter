// ANIMAL LIST FOR PROFILECARDJS 
export const AnimalList = ({ singleAnimal }) => {
    return (
        <>
            <div className="animalCard">
                <h2 className="animalHeader">{singleAnimal.name}</h2>
                <p className="animalP">XP: {singleAnimal.xp}</p>
                <p className="animalP">Date:{singleAnimal.date.slice([0], [10])}</p>
                <p className="animalP">EnCounter location: {singleAnimal.where}</p>
                <p className="animalP">Behavior:{singleAnimal.behavior} </p>
            </div>
        </>
    )
}