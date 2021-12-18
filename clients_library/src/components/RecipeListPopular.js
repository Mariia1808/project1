import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Button, Row } from "react-bootstrap";
import RecipeItem from "./RecipeItem";
import {Context} from "../index";
import "../css.css"
import { fetchRecipes } from "../http/recipeAPI";
import { fetchRatings } from "../http/ratingsAPI";
import { RECIPES_ROUTE } from "../utils/consts";
import { useHistory } from "react-router-dom";


const RecipeListPopular = observer(({filter}) => {
    const {recipe} = useContext(Context)
    const {rating} = useContext(Context)
    const history = useHistory()
    useEffect(() =>{
        fetchRecipes().then(data => recipe.setRecipe(data.rows))
    },[])
    
    
    let i =0
    return (
       
        <Row className="d-flex">
            {filter!=''?
                <>{recipe.recipes.map(recipe =>{
                    if(parseFloat(recipe.rate)>=parseFloat(filter))
                    return <><RecipeItem key={recipe.id} recipe={recipe}/></>
                    
                })}</>
            :
                <>{recipe.recipes.map(recipe =>{
                    if(parseFloat(recipe.rate)>=4.8)
                    {i+=1
                    if(i<4)
                    return <><RecipeItem key={recipe.id} recipe={recipe}/> <Button className="morerec" onClick={() => history.push(RECIPES_ROUTE)}>Больше рецептов</Button></>
                    }
                    
                })}</>
            }
            
        </Row>
    )
});

            
export default RecipeListPopular;
