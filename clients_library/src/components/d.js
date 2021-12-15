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
                Ftime!=''? Fcomplex!=''?
                    <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if((Fcomplex==recipe.complex.toString())&&(Ftime==parseInt(recipe.time)))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                Ftime!=''? Fkcal!=''?
                    <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if((Fkcal>parseInt(recipe.kcal))&&(Ftime==parseInt(recipe.time)))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                :
                Fcomplex!=''? Fkcal!=''?
                    <Row className="d-flex">{recipe.recipes.map(recipe =>{
                    if((Fkcal>parseInt(recipe.kcal))&&(Fcomplex==recipe.complex.toString()))
                    return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                : 
                    Fkcal!=''?
                        <Row className="d-flex">{recipe.recipes.map(recipe =>{
                        if(Fkcal>parseInt(recipe.kcal))
                        return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                    : 
                    Ftime!=''?
                        <Row className="d-flex">{recipe.recipes.map(recipe =>{
                        if(Ftime==parseInt(recipe.time))
                        return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                        :
                        Fcomplex!=''?
                        <Row className="d-flex">{recipe.recipes.map(recipe =>{
                            if(Fcomplex==recipe.complex.toString())
                               return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row>
                        :
                        <Row className="d-flex">лох2</Row>
                        :
                        <Row className="d-flex">лох3</Row>
                        :
                        <Row className="d-flex">вы ничего лох4не выбрали</Row>
                        :
                        <Row className="d-flex">вы ничеголох5 не выбрали</Row>
                        :
                        <Row className="d-flex"><Row className="d-flex">{recipe.recipes.map(recipe =>{
                            if((Fcomplex==recipe.complex.toString())&&(Ftime==parseInt(recipe.time)))
                            return <RecipeItem key={recipe.id} recipe={recipe}/>})}</Row></Row>
                        :
                        <Row className="d-flex">лох8</Row>
             }
         </Row>
         
       
    );
});

export default RecipeListFilter;
