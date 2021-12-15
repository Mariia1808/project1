import React, { useContext,  useState } from 'react';

import {Button, Form, Col,Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import { deleteRecipe } from '../http/recipeAPI';



const DeleteRecipe= ({show, onHide}) => {
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const {user}=useContext(Context)
    const [recipeId, setRecipeId] = useState('')

    const delRecipe = () =>{
        deleteRecipe(recipeId).then()
        onHide=true

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
                return <Form.Check className='lol2' type="radio" value={recipe.id} onChange={(e) => setRecipeId(e.target.value)} label={`${recipe.id}  ${recipe.name}`}/> 
                    })}
                   </Col>
                
               
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" onClick={delRecipe}>Удалить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default DeleteRecipe;