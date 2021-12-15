import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import RecipeItem from "./RecipeItem";
import {Context} from "../index";
import "../css.css"
import { fetchRecipes } from "../http/recipeAPI";


const RecipeList = observer(() => {
    const {recipe} = useContext(Context)
    useEffect(() =>{
        fetchRecipes().then(data => recipe.setRecipe(data.rows))
    },[])
    
    return (
        <Row className="d-flex">
            {recipe.recipes.map(recipe =>
                <RecipeItem key={recipe.id} recipe={recipe}/>)}
        </Row>
    )
});
            
export default RecipeList;
