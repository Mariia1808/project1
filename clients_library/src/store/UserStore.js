import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = true
        this._user = {}
        this._recipes = []
        this._favorites=[]

        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    setRecipe(recipes){
        this._recipes = recipes
    }
    setFavorite(favorites){
        this._favorites = favorites
    }
    get favorites(){
        return this._favorites
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get recipes(){
        return this._recipes
    }
}