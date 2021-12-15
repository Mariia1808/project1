import {makeAutoObservable} from "mobx";

export default class RecipeStore{
    constructor() {
        this._types = []
        this._recipes = []
        this._products=[]
        this._proportions=[]
        this._users=[]
        this._ratings=[]
        this._selectedType = {}
        this._selectedUser = {}
        this._selectedProduct = {}
        this._selectedProportion = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 15
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setUser(users){
        this._users = users
    }
    setRecipe(recipes){
        this._recipes = recipes
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedUser(user){
        this._selectedUser = user
    }
    setSelectedProduct(product){
        this.setPage(1)
        this._selectedProduct = product
    }
    setProducts(products){
        this._products = products
    }
    setSelectedProportoin(proportoin){
        this._selectedProportoin = proportoin
    }
    setProportions(proportions){
        this._proportions = proportions
    }
    setFavorites(favorites){
        this._favorites = favorites
    }
    setCooks(cooks){
        this._cooks = cooks
    }
    setRatings(ratings){
        this._ratings = ratings
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setlimit(limit){
        this._limit = limit
    }
    
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get ratings(){
        return this._ratings
    }
    get cooks(){
        return this._cooks
    }
    get favorites(){
        return this._favorites
    }
    get types(){
        return this._types
    }
    get users(){
        return this._users
    }
    get recipes(){
        return this._recipes
    }
    get selectedType(){
        return this._selectedType
    }
    get products(){
        return this._products
    }
    get selectedProduct(){
        return this._selectedProduct
    }

    get proportions(){
        return this._proportions
    }
    get selectedProportoin(){
        return this._selectedProportion
    }
}