import {$authHost, $host} from "./index";


export const fetchProducts = async () => {
    const {data} = await $host.get('api/product/')
    console.log(data)
    return data
}

export const fetchProportions = async () => {
    const {data} = await $host.get('api/proportion/')
    console.log(data)
    return data
}
export const createProportion = async (proportion) =>{
    const {data} = await $authHost.post('api/proportion/', proportion)
    console.log(data)
    return data
}
export const createProduct = async (product) =>{
    const {data} = await $authHost.post('api/product/', product)
    console.log(data)
    return data
}
export const deleteProportion= async (id) => {
    const {data} = await $authHost.delete('api/proportion/' + id)
    console.log(data)
    return data
}
export const updateProportion = async (proportion) =>{
    const {data} = await $authHost.put('api/proportion/'+proportion.id, proportion)
    console.log(data)
    return data
}
