import {$authHost, $host} from "./index";

export const fetchRatings = async () => {
    const {data} = await $authHost.get('api/rating/')
    return data
}
export const fetchOneRatings = async (id) => {
    const {data} = await $authHost.get('api/rating/'+ id)
    return data
}

export const createRatings = async (ratings) =>{
    const {data} = await $authHost.post('api/rating/', ratings)
    console.log(data)
    return data
}
export const deleteRatings= async (id) => {
    const {data} = await $authHost.delete('api/rating/' + id)
    console.log(data)
    return data
}
export const updateRatings= async (ratings) => {
    const {data} = await $authHost.put('api/rating/' + ratings.id, ratings)
    console.log(data)
    return data
}
