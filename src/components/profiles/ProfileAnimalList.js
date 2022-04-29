// ANIMAL LIST FOR PROFILECARDJS 
export const AnimalList = ({ singleAnimal }) => {
    return (
        <>
            <h2>{singleAnimal.name}</h2>
            <p>{singleAnimal.date.slice([0],[10])}</p>
            <p>{singleAnimal.xp}</p>
            <p>{singleAnimal.behavior}</p>

        </>
    )
}