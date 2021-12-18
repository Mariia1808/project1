import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form} from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Context } from '..';
import RecipeList from "../components/RecipeList";
import { fetchRecipes, fetchTypes } from '../http/recipeAPI';
import Pages from "../components/Pages";
import RecipeListPopular from '../components/RecipeListPopular';



const Recipes = observer(() => {
        const [filter, setFilter] = useState('')
        const {recipe}=useContext(Context)
        useEffect(()=>{
                fetchTypes().then(data=>recipe.setTypes(data))
                fetchRecipes(null, 1, 12).then(data=> {
                        recipe.setRecipe(data.rows)
                        recipe.setTotalCount(data.count)
                })
        },[])
        useEffect(()=>{
                fetchRecipes(recipe.selectedType.id, recipe.page, 12).then(data=> {
                        recipe.setRecipe(data.rows)
                        recipe.setTotalCount(data.count)
                })
        },[recipe.page, recipe.selectedType])
        const reset =()=>{
                return setFilter(''), recipe.setSelectedType('')
        }
        return (
            
            <Container
            className="tbody"> 
                <Row className='d1'><text className='r'>Рейтинг</text>
                <Button variant={"outline-light"} value={'3'} onClick={e => setFilter(e.target.value)} className="lol">&gt;3</Button>
                <Button variant={"outline-light"} value={'3.5'} onClick={e => setFilter(e.target.value)} className="lol">&gt;3.5</Button>
                <Button variant={"outline-light"} value={'4'} onClick={e => setFilter(e.target.value)} className="lol">&gt;4</Button>
                <Button variant={"outline-light"} value={'4.5'} onClick={e => setFilter(e.target.value)} className="lol">&gt;4.5</Button>
                <Button variant={"outline-light"} onClick={reset} className="lol">Сбросить</Button>
                </Row>
                {filter!=''?
                <Row>
                     <Col md={12}>
                     <RecipeListPopular filter={filter}/>
                     <Pages/>
                     </Col>
                </Row>
                :
                <Row>
                    <Col md={12}>
                    <RecipeList/>
                    <Pages/>
                    </Col>
                </Row>}
                <div className="prtype"></div>
            </Container>
           
        );
});

export default Recipes;
