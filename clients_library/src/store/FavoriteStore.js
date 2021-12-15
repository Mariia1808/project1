import {makeAutoObservable} from "mobx";

export default class FavoriteStore{
    constructor() {
        this._user = {}
        this._recipes = []
        this._favorites=[]

        makeAutoObservable(this)
    }

   
    setUser(user){
        this._user = user
    }
    setRecipe(recipes){
        this._recipes = recipes
    }
    setFavorites(favorites){
        this._favorites = favorites
    }
   
    get favorites(){
        return this._favorites
    }
    get user(){
        return this._user
    }
    get recipes(){
        return this._recipes
    }
}