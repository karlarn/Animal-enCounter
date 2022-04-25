export const addAnimal=(newAnimal)=>{
    return fetch ('http://localhost:8088/animals',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAnimal)
    }).then(response => response.json())
}

export const getAnimalById=(currentUserId)=>{
    return fetch(`http://localhost:8088/animals?userId=${currentUserId}`)
    .then(res => res.json())
}