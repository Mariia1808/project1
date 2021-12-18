import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Container, Navbar, Row} from "react-bootstrap"
import CreateRecipe from '../modals/CreateRecipe';
import CreateProduct from '../modals/CreateProduct';
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import {  fetchOneUser, fetchRecipes, fetchUser } from '../http/userAPI';
import RecipeItem from '../components/RecipeItem';
import UpdateProportion from '../modals/UpdateProportion';
import DeleteAndUpdateProportion from '../modals/DeleteProportion';
import DeleteRecipe from '../modals/DeleteRecipe';
import { fetchUserFavorite } from '../http/favoriteAPI';
import { fetchUserCook } from '../http/cookAPI';
import DeleteFavorite from '../modals/DeleteFavorite';
import DeleteCook from '../modals/DeleteCook';



const UserPage = observer(() => {
    const {id} = useParams()
    const [recipeVisible, setRecipeVisible] = useState(false)
    const [UpProportionVisible, setUpProportionVisible] = useState(false)
    const [proportionVisible, setProportionVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [DelRecipeVisible, setDelRecipeVisible] = useState(false)
    const [DelFavoriteVisible, setDelFavoriteVisible] = useState(false)
    const [DelCookVisible, setDelCookVisible] = useState(false)
    
    const {user} = useContext(Context)
    const {recipe} = useContext(Context)
    const {favorite} = useContext(Context)
    const [users, setUsers] = useState({info:[]})
    const [cooked, setCooked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [my, setMy] = useState(true)
    
    useEffect(() => {
        fetchRecipes().then(data => user.setRecipe(data.rows))
        //fetchOneRecipe(id).then(data => setRecipes(data))
        fetchOneUser(id).then(data => setUsers(data))
        fetchUser().then(data=>user.setUser(data))
        //fetchFavorites().then(data=>favorite.setFavorites(data))
        fetchUserFavorite(id).then(data=> {console.log(data)
        favorite.setFavorites(data)})
        fetchUserCook(id).then(data=> {console.log(data)
            favorite.setCooks(data)})
        //fetchCooks().then(data=>user.setCooks(data))
        
    },[])
        const one =()=>{return setFavorited(true), setCooked(false), setMy(false)}
        const two =()=>{return setFavorited(false), setCooked(true), setMy(false)}
        const free =()=>{return setFavorited(false), setCooked(false), setMy(true)}
        return (          
        <Container className="tbody">
            {recipe.setSelectedType('')}
           <text className='username'>{users.name}<br/></text>
           <hr/>
           <div className='d'>
               <Button variant={"outline-light"}  className="lol3" onClick={() => one()}>Избранное</Button>
               <Button variant={"outline-light"}  className="lol3" onClick={() => two()}>Приготовленные</Button>
               <Button variant={"outline-light"}  className="lol3" onClick={() => free()}>Ваши рецепты</Button>
            </div><hr/>
           <br/>
           <div className='d'>
            <Button variant={"outline-light"}  className="lol" onClick={() => setRecipeVisible(true)}>Добавить рецепт</Button>
            <CreateRecipe show={recipeVisible} onHide={()=> setRecipeVisible(false)}/>
            
            <Button variant={"outline-light"}  className="lol" onClick={() => setDelRecipeVisible(true)}>Удалить рецепт</Button>
            <DeleteRecipe show={DelRecipeVisible} onHide={()=> setDelRecipeVisible(false)}/>
            
            
            <Button variant={"outline-light"} className="lol" onClick={() => setUpProportionVisible(true)}>Удалить пропорции</Button>
            <DeleteAndUpdateProportion show={UpProportionVisible} onHide={()=> setUpProportionVisible(false)}/>


            <Button variant={"outline-light"}  className="lol" onClick={() => setProductVisible(true)}>Добавить продукт</Button>
            <CreateProduct show={productVisible} onHide={()=> setProductVisible(false)}/>
            </div>
            <div className='d'>
            <Button variant={"outline-light"}  className="lol" onClick={() => setDelFavoriteVisible(true)}>Удалить избраннное</Button>
            <DeleteFavorite show={DelFavoriteVisible} onHide={()=> setDelFavoriteVisible(false)}/>
            
            <Button variant={"outline-light"}  className="lol" onClick={() => setDelCookVisible(true)}>Удалить приготовленное</Button>
            <DeleteCook show={DelCookVisible} onHide={()=> setDelCookVisible(false)}/>
            
            </div>
            
            <hr/>
           
            {my?
            <><div className='d'><text className='vibor'>Ваши рецепты</text></div>
            <Row className="d-flex">
            {user.recipes.map(recipe =>{
                if(users.id === parseInt(recipe.userId))
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}
            </Row></>
            :
            null}

            {favorited?
            <><div className='d'><text className='vibor'>Рецепты, которые вам понравились </text></div>
            <Row className="d-flex">
            {favorite.favorites.map(recipe =>{
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}
            </Row></>
            :
            null}

            {cooked?
            <><div className='d'><text className='vibor'>Рецепты, которые вы приготовили </text></div>
            <Row className="d-flex">
            {favorite.cooks.map(recipe =>{
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}
            </Row></>
            :
            null}
            
            <div className="prtype"></div>
               
        </Container>
        
        );
    
});

export default UserPage;