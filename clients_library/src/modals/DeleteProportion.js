import React, { useContext, useEffect, useState } from 'react';
import {Button, Form, Col, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import { deleteProportion, fetchProducts, fetchProportions } from '../http/productAPI';




const DeleteAndUpdateProportion = ({show, onHide}) => {
    
    //const [Prop, SetProp] = useState('')
    const [recipeId, setrecipeId] = useState('')
    const {user, recipe}=useContext(Context)
    
    useEffect(() => {
        //fetchOneUser(id).then(data => setUsers(data))
        fetchProducts().then(data => recipe.setProducts(data))
        fetchProportions().then(data => recipe.setProportions(data))
    },[])

    const delProportion = (Prop) =>{
        deleteProportion(Prop).then(data => onHide())
        fetchProportions(data => recipe.setProportions(data)).then()
    }
    
  
   
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    return (
        
        <Modal 
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered contentClassName="pr0">
        <Container className="form">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Удаление пропорций
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
           
            <Col md={7}>
            <Form.Control as="select" value={recipeId} className='q1' onChange={(e) => setrecipeId(e.target.value)} defaultValue="Продукт...">
                <option>Выберите рецепт</option>
                {user.recipes.map(recipe =>{
                if(parseInt(decodedData.id) === parseInt(recipe.userId))
                return <option  value={recipe.id}>{recipe.name}</option> 
                    })}
                    </Form.Control></Col><hr/>

               
                {recipe.proportions.map(proportion => {
                    if (parseInt(recipeId) === parseInt(proportion.recipeId))
                    return <p>{recipe.products.map(product => {
                        if (product.id === proportion.productId)
                        return <><text className='lol2' > {product.name}:{proportion.kolvo} грамм</text>
                        <Button className='lol4' value={proportion.id} key={proportion.id} onClick={(e) => delProportion(e.target.value)}>Удалить</Button><hr/></>
                            }
                        )}</p>
                    }
                )}

               
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default DeleteAndUpdateProportion;