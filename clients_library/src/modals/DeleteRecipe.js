import React, { useContext,  useState } from 'react';

import {Button, Form, Col,Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import { deleteRecipe } from '../http/recipeAPI';
import { fetchRecipes } from '../http/userAPI';



const DeleteRecipe= ({show, onHide}) => {
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const {user}=useContext(Context)
    
    const delRecipe = (recipeId) =>{
        deleteRecipe(recipeId).then(data => onHide())
        fetchRecipes(data => user.setRecipes(data)).then()
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
                Удаление рецепта
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Col md={12}>
            
                {user.recipes.map(recipe =>{
                if(decodedData.id === parseInt(recipe.userId))
                return <><text className='lol2'>{recipe.name}</text>
                <Button className='lol4' value={recipe.id} onClick={(e) => delRecipe(e.target.value)}>Удалить</Button><hr/></>
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
  
export default DeleteRecipe;