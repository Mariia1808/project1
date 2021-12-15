import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Container, Row} from "react-bootstrap"
import CreateRecipe from '../modals/CreateRecipe';
import CreateProduct from '../modals/CreateProduct';
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
import {  fetchOneUser, fetchRecipes, fetchUser } from '../http/userAPI';
import RecipeItem from '../components/RecipeItem';
import CreateProportion from '../modals/CreateProportion';
import DeleteAndUpdateProportion from '../modals/DeleteProportion';
import DeleteRecipe from '../modals/DeleteRecipe';
import { fetchFavorites } from '../http/favoriteAPI';
import DeleteFavorite from '../modals/DeleteFavorite';



const UserPage = observer(() => {
    const {id} = useParams()
    const [recipeVisible, setRecipeVisible] = useState(false)
    const [DelAndUpProportionVisible, setDelAndUpProportionVisible] = useState(false)
    const [proportionVisible, setProportionVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    const [DelRecipeVisible, setDelRecipeVisible] = useState(false)
    const [DelFavoriteVisible, setDelFavoriteVisible] = useState(false)
    
    const {user} = useContext(Context)
    const {favorite} = useContext(Context)
    const [users, setUsers] = useState({info:[]})
    
    useEffect(() => {
        fetchRecipes().then(data => user.setRecipe(data.rows))
        //fetchOneRecipe(id).then(data => setRecipes(data))
        fetchOneUser(id).then(data => setUsers(data))
        fetchUser().then(data=>user.setUser(data))
        fetchFavorites().then(data=>favorite.setFavorites(data))
        //fetchCooks().then(data=>user.setCooks(data))
        
    },[])

        return (          
        <Container className="tbody">

           <h1>{users.name}</h1><br/><br/>

            <Button variant={"outline-light"}  className="lol" onClick={() => setRecipeVisible(true)}>Добавить рецепт</Button>
            <CreateRecipe show={recipeVisible} onHide={()=> setRecipeVisible(false)}/>
            
            <Button variant={"outline-light"}  className="lol" onClick={() => setDelRecipeVisible(true)}>Удалить рецепт</Button>
            <DeleteRecipe show={DelRecipeVisible} onHide={()=> setDelRecipeVisible(false)}/>
            

            <Button variant={"outline-light"}  className="lol" onClick={() => setProportionVisible(true)}>Добавить пропорции</Button>
            <CreateProportion show={proportionVisible} onHide={()=> setProportionVisible(false)}/>

            

            <Button variant={"outline-light"}  className="lol" onClick={() => setProductVisible(true)}>Добавить продукт</Button>
            <CreateProduct show={productVisible} onHide={()=> setProductVisible(false)}/>

            
            <Button variant={"outline-light"} className="lol" onClick={() => setDelAndUpProportionVisible(true)}>Удалить пропорции</Button>
            <DeleteAndUpdateProportion show={DelAndUpProportionVisible} onHide={()=> setDelAndUpProportionVisible(false)}/>
            
            
           
            
                      <h1>Ваши рецепты</h1>
            <Row className="d-flex">
            {user.recipes.map(recipe =>{
                if(users.id === parseInt(recipe.userId))
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}
            </Row>
            
            <div className="prtype"></div>
               
        </Container>
        
        );
    
});

export default UserPage;