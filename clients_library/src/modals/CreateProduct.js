import React, { useState } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import '../css.css';
import { createProduct } from '../http/productAPI';



const CreateProduct = ({show, onHide}) => {
    
    const [name, setName] = useState('')
    const [kcal, setKcal] = useState('')
    const [protein, setProtein] = useState('')
    const [carb, setCarb] = useState('')
    const [fat, setFat] = useState('')
    
    const addProduct = () =>{
        const formData= new FormData()
        formData.append('name', name)
        formData.append('kcal', kcal)
        formData.append('protein', protein)
        formData.append('fat', fat)
        formData.append('carb', carb)
        createProduct(formData).then(data => onHide())
        return setName(''),setKcal(''),
        setProtein(''), setCarb(''), setFat('')
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
                Добавление продукта
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={"Введите название рецепта"}/>
                <Form.Control value={kcal} onChange={e => setKcal(e.target.value)} className="mt-3" placeholder="Каллории" />
                <Form.Control value={protein} onChange={e => setProtein(e.target.value)} className="mt-3" placeholder="Белки"/>
                <Form.Control value={fat} onChange={e => setFat(e.target.value)} className="mt-3" placeholder="Жиры"/>
                <Form.Control value={carb} onChange={e => setCarb(e.target.value)} className="mt-3" placeholder="Углеводы"/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" onClick={addProduct}>Добавить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default CreateProduct;