import {$authHost, $host} from "./index";


export const fetchTypes = async () => {
    const {data} = await $host.get('api/type/')
    console.log(data)
    return data
}

export const createType = async (type) =>{
    const {data} = await $authHost.post('api/type/', type)
    console.log(data)
    return data
}