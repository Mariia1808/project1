import {$authHost, $host} from "./index";


export const createRecipe = async (recipe) => {
    const {data} = await $authHost.post('api/recipe/', recipe)
    console.log(data)
    return data
}

export const fetchRecipes = async (typeId, page, limit) => {
    const {data} = await $host.get('api/recipe/', {params:{
        typeId, page, limit
    }})
    console.log(data)
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type/')
    console.log(data)
    return data
}
export const fetchFavRecipes = async () => {
    const {data} = await $authHost.get('api/recipe/')
    console.log(data)
    return data
}

export const fetchOneRecipe = async (id) => {
    const {data} = await $host.get('api/recipe/'+ id)
    console.log(data)
    return data
}
export const updateRecipe = async (recipe) => {
    const {data} = await $authHost.put('api/recipe/'+recipe.id, recipe)
    console.log(data)
    return data
}
export const updateKcal = async (recipe) => {
    const {data} = await $authHost.put('api/recipe/kcal/'+recipe.id, recipe)
    console.log(data)
    return data
}
export const updateRate = async (recipe) => {
    const {data} = await $authHost.put('api/recipe/rate/'+recipe.id, recipe)
    console.log(data)
    return data
}
export const deleteRecipe = async (id) => {
    const {data} = await $authHost.delete('api/recipe/' + id)
    console.log(data)
    return data
}
export const fetchFavorite = async (id, userId) => {
    const {data} = await $authHost.get('api/recipe/'+ id+'/'+userId)
    console.log(data)
    return data
}

