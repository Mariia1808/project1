import React, { useContext, useEffect, useState } from 'react';
import {Button, Form, Col, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import jwt_decode from "jwt-decode";
import {createProportion, fetchProducts, fetchProportions } from '../http/productAPI';



const CreateProportion = ({show, onHide}) => {
    
    
    const [kolvo, setKolvo] = useState('')
    const [recipeId, setrecipeId] = useState('')
    const [productId, setproductId] = useState('')
    const {user, recipe}=useContext(Context)
    
   
    useEffect(() => {
        //fetchOneUser(id).then(data => setUsers(data))
        fetchProducts().then(data => recipe.setProducts(data))
        fetchProportions().then(data => recipe.setProportions(data))
    },[])

    const addProportion = () =>{
        const formData= new FormData()
        formData.append('kolvo', parseInt(kolvo))
        formData.append('recipeId', parseInt(recipeId))
        formData.append('productId', parseInt(productId))
        createProportion(formData)
        fetchProportions().then(data=>recipe.setProportions(data))
        fetchProducts().then(data => recipe.setProducts(data))
        return setKolvo('')
    }
    
  
   
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
                Добавление пропорций
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Col md={4}>
                
            <Form.Control as="select" className='q' value={recipeId} onChange={(e) => setrecipeId(e.target.value)}>
                <option>Выберите рецепт</option>
                {user.recipes.map(recipe =>{
                if(decodedData.id === parseInt(recipe.userId))
                return <option  value={recipe.id}>{recipe.name}</option> 
                    })}
                    </Form.Control></Col><hr/>

                {recipe.proportions.map(proportion => {
                    if (parseInt(recipeId) === parseInt(proportion.recipeId))
                    return <p className="kolvo"  value={proportion.id}>
                    {recipe.products.map(product => {
                        if (product.id === proportion.productId)
                        return <div className='lol1'> <text className="prodtext" value={product.id}>{product.name}:&emsp;&emsp;&emsp;&emsp; {proportion.kolvo} грамм</text> 
                        &emsp;&emsp;&emsp;&emsp;<hr/>
                        </div>
                        
                            }
                        )}
                        
                        </p>
                        
                    }
                )}


                <Col md={4}>
                    <Form.Control as="select" className='q' value={productId} onChange={(e) => setproductId(e.target.value)} defaultValue="Продукт...">
                        <option>Выберите продукт</option>
                    {recipe.products.map(product =>
                        <option value={product.id}>{product.name}</option> 
                        )}
                    </Form.Control></Col>
                  
                    <Col md={4}><Form.Control className="mt-3" className='q' value={kolvo} onChange={e => setKolvo(e.target.value)} placeholder="Введите количество в граммах"/></Col>

               
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" onClick={addProportion}>Добавить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default CreateProportion;