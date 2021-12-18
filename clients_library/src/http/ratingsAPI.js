import {$authHost, $host} from "./index";

export const fetchRatings = async () => {
    const {data} = await $authHost.get('api/rating/')
    console.log(data)
    return data
}

export const createRatings = async (ratings) =>{
    const {data} = await $authHost.post('api/rating/', ratings)
    console.log(data)
    return data
}
export const deleteRatings= async (userId, recipeId, rate) => {
    const {data} = await $authHost.delete('api/rating/' + userId + '/' + recipeId + '/' + rate)
    console.log(data)
    return data
}
export const updateRatings= async (ratings) => {
    const {data} = await $authHost.put('api/rating/' + ratings.id, ratings)
    console.log(data)
    return data
}
export const fetchUserRating = async (id) => {
    const {data} = await $authHost.get('api/rating/'+ id)
    console.log(data)
    return data
}
