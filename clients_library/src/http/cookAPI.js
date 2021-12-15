import {$authHost, $host} from "./index";

export const fetchCooks = async () => {
    const {data} = await $authHost.get('api/cook/')
    return data
}

export const createCook = async (cook) =>{
    const {data} = await $authHost.post('api/cook/', cook)
    console.log(data)
    return data
}
export const deleteCook= async (id) => {
    const {data} = await $authHost.delete('api/cook/' + id)
    console.log(data)
    return data
}