import React, { useContext } from 'react';
import {Card, Button,Image, Col, Row } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import star from '../assets/Layer.png'
import { RECIPE_ROUTE } from '../utils/consts';
import '../css.css'
import { Context } from '..';
import jwt_decode from "jwt-decode";

const RecipeItem = ({recipe}) => {
    const {user} = useContext(Context)
    const history = useHistory()
    //const {recipe} = useContext(Context)
    const {rating} = useContext(Context)
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    
    return (
        
        
            <Card style={{cursor: 'pointer'}} className="recipecard">
                <Image width={208} height={150} scr={process.env.REACT_APP_API_URL + recipe.img}/>
                <div className="">
                    <h3 className="nameres">{recipe.name}</h3>
                    <Row className="">
                    <div className="raterec1"><text>{recipe.rate}</text></div><Col id='u' className='md-4'><text>{recipe.complex}</text></Col>
                        
                    </Row>                  
                </div>
                <div className="descript">{recipe.profile_mini}</div>
                <div className='empty'></div>
                    <Button 
                variant={"outline-light"}
                onClick={() => history.push(RECIPE_ROUTE + '/' + recipe.id)}
                className="watch">Посмотреть</Button>

            </Card>
       
    );
};

export default RecipeItem;