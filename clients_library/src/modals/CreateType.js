import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, Col,Row, Card, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import { createProduct, fetchProducts, fetchProportions } from '../http/productAPI';
import {createType} from '../http/typeAPI';



const CreateType= ({show, onHide}) => {
    
    const [name, setName] = useState('')
    

    const Create = () =>{
            createType({name: name}).then(data => onHide())
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
                Добавление типа
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={"Введите название "}/>
               
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" onClick={Create}>Добавить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default CreateType;