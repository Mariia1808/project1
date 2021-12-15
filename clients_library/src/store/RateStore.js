import {makeAutoObservable} from "mobx";

export default class RateStore{
    constructor() {
        this._user = {}
        this._recipes = []
        this._ratings=[]

        makeAutoObservable(this)
    }

   
    setUser(user){
        this._user = user
    }
    setRecipe(recipes){
        this._recipes = recipes
    }
    setRatings(ratings){
        this._ratings = ratings
    }
   
    get ratings(){
        return this._ratings
    }
    get user(){
        return this._user
    }
    get recipes(){
        return this._recipes
    }
}