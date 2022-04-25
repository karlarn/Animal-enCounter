export const AnimalCard=({singleAnimal})=>{
    return (
        <> 
        <h2>{singleAnimal.name}</h2>
        <p>{singleAnimal.date}</p>
        <p>{singleAnimal.xp}</p>
        <p>{singleAnimal.behavior}</p>
        </>
    )
}