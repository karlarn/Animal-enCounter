// RETURNS ALL ANIMALS IN THE DB
export const addAnimal = (newAnimal) => {
    return fetch('http://localhost:8088/animals', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAnimal)
    }).then(res => res.json())
}

// RETURNS ALL ANIMALS FROM DB RELATING TO A SINGLE USER ID AND SORTS IT BY DATE
export const getAnimalByUserId = (currentUserId) => {
    return fetch(`http://localhost:8088/animals?userId=${currentUserId}&_sort=date&_order=desc`)
        .then(res => res.json())
}

// RETURNS ONE SPECIFIC ANIMAL FROM DB
export const getAnimalById = (animalId) => {
    return fetch(`http://localhost:8088/animals/${animalId}`)
        .then(res => res.json())
}

//   UPDATES PORTIONS OF A SPECIFIC ANIMAL IN THE DB
export const updateAnimal = (singleAnimal) => {
    return fetch(`http://localhost:8088/animals/${singleAnimal.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleAnimal)
    }).then(data => data.json());
}

// FETCHES ALL ANIMALS IN THE DB
export const getAllAnimals = () => {
    return fetch('http://localhost:8088/animals')
        .then(res => res.json())
}