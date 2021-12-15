import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Form} from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Context } from '..';
import RecipeList from "../components/RecipeList";
import { fetchRecipes, fetchTypes } from '../http/recipeAPI';
import Pages from "../components/Pages";



const Recipes = observer(() => {
        
        const {recipe}=useContext(Context)
        useEffect(()=>{
                fetchTypes().then(data=>recipe.setTypes(data))
                fetchRecipes(null, 1, null).then(data=> {
                        recipe.setRecipe(data.rows)
                        recipe.setTotalCount(data.count)
                })
        },[])
        useEffect(()=>{
                fetchRecipes(recipe.selectedType.id, recipe.page, recipe.limit).then(data=> {
                        recipe.setRecipe(data.rows)
                        recipe.setTotalCount(data.count)
                })
        },[recipe.page, recipe.selectedType])
        return (
            
            <Container
            className="tbody"> 
                <Row>
                    <Col md={9}>
                        
                    <RecipeList/>
                    <Pages/>
                    </Col>
                   
                    
                </Row><div className="prtype"></div>
            </Container>
           
        );
});

export default Recipes;
