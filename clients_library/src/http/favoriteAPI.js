import {$authHost, $host} from "./index";

export const fetchFavorites = async () => {
    const {data} = await $authHost.get('api/favorite/')
    return data
}
export const fetchOneFavorites = async (id) => {
    const {data} = await $authHost.get('api/favorite/'+ id)
    return data
}

export const createFavorite = async (favorite) =>{
    const {data} = await $authHost.post('api/favorite/', favorite)
    console.log(data)
    return data
}
export const deleteFavorite= async (id) => {
    const {data} = await $authHost.delete('api/favorite/' + id)
    console.log(data)
    return data
}