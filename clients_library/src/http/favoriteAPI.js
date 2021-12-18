import {$authHost, $host} from "./index";

export const fetchFavorites = async () => {
    const {data} = await $authHost.get('api/favorite/')
    console.log(data)
    return data
}
// export const fetchOneFavorites = async (id) => {
//     const {data} = await $authHost.get('api/favorite/'+ id)
//     console.log(data)
//     return data
// }

export const createFavorite = async (favorite) =>{
    const {data} = await $authHost.post('api/favorite/', favorite)
    console.log(data)
    return data
}
export const deleteFavorite= async (recipeId, userId) => {
    const {data} = await $authHost.delete('api/favorite/' + recipeId + '/' + userId)
    console.log(data)
    return data
}
export const fetchUserFavorite = async (id) => {
    const {data} = await $authHost.get('api/favorite/'+ id)
    console.log(data)
    return data
}
