import React, { useContext } from 'react';
import {Card, Button,Image } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import star from '../assets/Layer.png'
import { RECIPE_ROUTE } from '../utils/consts';
import '../css.css'
import { Context } from '..';


const RecipeItem = ({recipe}) => {
    const history = useHistory()
    const {rating} = useContext(Context)
    const meanMark = (recipesId) =>{
        let count = 0
        let sum = 0
        rating.ratings.map(items => {
            if (items.recipeId === parseInt(recipesId))
            {
                count += 1
                sum += parseInt(items.rate)
            }
        })
        if (count === 0){
            count = 1
        }
        return <i>{sum/(count)}</i>
    }
    return (
        
        
            <Card style={{cursor: 'pointer'}} className="recipecard">
                <Image width={208} height={150} scr={'http://localhost:5000/' + recipe.img}/>
                <div className="">
                    <h3 className="nameres">{recipe.name}</h3>
                    <div className="">
                    <div className="raterec1"><text>{meanMark(recipe.id)}</text></div>
                        
                    </div>                  
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