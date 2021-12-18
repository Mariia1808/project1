import {makeAutoObservable} from "mobx";

export default class FavoriteStore{
    constructor() {
        this._user = {}
        this._favorite = {}
        this._recipes = []
        this._favorites=[]
        this._cooks=[]
        this._ratings=[]

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
    setFavorite(favorite){
        this._favorite = favorite
    }
    setCooks(cooks){
        this._cooks = cooks
    }
    setRatings(cooks){
        this._cooks = cooks
    }
   
    get ratings(){
        return this._cooks
    }
    get cooks(){
        return this._cooks
    }
    get favorite(){
        return this._favorite
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