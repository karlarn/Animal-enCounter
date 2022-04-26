// RETURNS AN ARRAY OF USER OBJECTS 
export const getAllUsers=()=>{
    return fetch('http://localhost:8088/users')
    .then(res => res.json())
}