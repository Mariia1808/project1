import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Row, Container } from "react-bootstrap";
import RecipeItem from "./RecipeItem";
import {Context} from "../index";
import "../css.css"
import { fetchRecipes } from "../http/recipeAPI";


const RecipeListFilter = observer(({Ftime, Fcomplex, Fkcal}) => {
    const {recipe} = useContext(Context)
    useEffect(() =>{
        fetchRecipes().then(data => recipe.setRecipe(data.rows))
    },[])
    return (
        
        <Row className="d-flex">
            {Ftime!=''? Fkcal!=''? Fcomplex!=''?
                <Row className="d-flex">{recipe.recipes.map(recipe =>{ 
                if((Fkcal>parseInt(recipe.kcal))&&(Ftime==parseInt(recipe.time))&&(Fcomplex==recipe.complex.toString()))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
               :
                    <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if((Fkcal>parseInt(recipe.kcal))&&(Ftime==parseInt(recipe.time)))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                <></>
               :
                <></>
             }
             {Ftime==''? Fkcal!=''? Fcomplex!=''?
             <Row className="d-flex">{recipe.recipes.map(recipe =>{
                if((Fkcal>parseInt(recipe.kcal))&&(Fcomplex==recipe.complex.toString()))
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if(Fkcal>parseInt(recipe.kcal))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                : 
                <></>:<></>
            }
            {Fkcal==''? Fcomplex!=''? Ftime!=''?  
             <Row className="d-flex">{recipe.recipes.map(recipe =>{
                if((Fcomplex==recipe.complex.toString())&&(Ftime==parseInt(recipe.time)))
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if(Fcomplex==recipe.complex.toString())
                       return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                : 
                <></>
                :
                <></>
            }

            {Fkcal==''? Fcomplex==''? Ftime!=''?  
            <Row className="d-flex">{recipe.recipes.map(recipe =>{
                if(Ftime==parseInt(recipe.time))
                return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                <></>
                : 
                <></>
                :
                <></>
            }

         </Row>
         
       
    );
});

export default RecipeListFilter;
