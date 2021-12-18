import React, { useContext, useEffect, useState, } from 'react';

import {Button, Form, Col, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import { fetchFavorites, fetchUserFavorite } from '../http/favoriteAPI';
import { fetchFavRecipes } from '../http/recipeAPI';
import { deleteCook, fetchUserCook } from '../http/cookAPI';


const DeleteCook = ({show, onHide}) => {
    
   
    const {favorite}=useContext(Context)

    const [recipeId, setRecipeId] = useState('')
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    useEffect(() => {
        fetchUserCook(decodedData.id).then(data=>favorite.setCooks(data))        
    },[])

    const delCo=(recipeId)=>{
        deleteCook(recipeId, decodedData.id).then(data => onHide())
    }

    return (
        
        <Modal 
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered contentClassName="pr">
        <Container className="form">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Удаление из приготовленных
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Col md={12}>
            
            {favorite.cooks.map(recipe =>{
            return <><text className='lol2'>{recipe.name}</text>
            <Button className='lol4' value={recipe.id} onClick={(e) => delCo(e.target.value)}>Удалить</Button><hr/></>
                })}
            </Col>               
            </Form>
            
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default DeleteCook;