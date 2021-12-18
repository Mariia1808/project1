import {$authHost, $host} from "./index";

export const fetchCooks = async () => {
    const {data} = await $authHost.get('api/cook/')
    console.log(data)
    return data
}

export const createCook = async (cook) =>{
    const {data} = await $authHost.post('api/cook/', cook)
    console.log(data)
    return data
}
export const deleteCook= async (recipeId, userId) => {
    const {data} = await $authHost.delete('api/cook/' + recipeId + '/' + userId)
    console.log(data)
    return data
}
export const fetchUserCook = async (id) => {
    const {data} = await $authHost.get('api/cook/'+ id)
    console.log(data)
    return data
}