// RETURNS AN ARRAY OF USER OBJECTS 
export const getAllUsers = () => {
    return fetch('http://localhost:8088/users')
        .then(res => res.json())
}

// RETURNS A USER OBJECT BASED ON THE ID
export const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
        .then(res => res.json())
}