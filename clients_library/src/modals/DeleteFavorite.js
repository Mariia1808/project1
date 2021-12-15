import React, { useContext, useEffect, } from 'react';

import {Button, Form, Col, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import { fetchFavorites } from '../http/favoriteAPI';
import { fetchFavRecipes } from '../http/recipeAPI';


const DeleteFavorite = ({show, onHide}) => {
    
   
    const {favorite}=useContext(Context)

   
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    return (
        
        <Modal 
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered contentClassName="pr">
        <Container className="form">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Удаление 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            {decodedData.id}
            {/* <Col md={4}>
            <Form.Control as="select" defaultValue="Продукт...">
                {favorite.favorites.map(favorite =>{
                if(parseInt(decodedData.id) === parseInt(favorite.userId))
                return <option>{favorite.recipeId}</option> 
                    })}
                    </Form.Control></Col> */}


                <Col md={4}>
            <Form.Control as="select" defaultValue="jytr...">
                {favorite.recipes.map(recipe =>{
               
                return <option value={recipe.id}>{recipe.name}</option> 
                    })}
                    </Form.Control></Col>


                     <Col md={4}>
            <Form.Control as="select" defaultValue="hg...">
                {favorite.recipes.map(recipe =>{
               favorite.favorites.map(favorite =>{
                if((parseInt(decodedData.id) === parseInt(favorite.userId))&&(parseInt(recipe.id)===parseInt(favorite.recipeId)))
                return <option value={favorite.id}>{favorite.recipeId}</option> 
                    })
                    })}
                    </Form.Control></Col>
                   
                    

               
            </Form>
            
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" >Удалить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default DeleteFavorite;