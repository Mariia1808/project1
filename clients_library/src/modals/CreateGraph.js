import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Form, Col,Row, Card, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import '../css.css';
import { createProduct, fetchProducts, fetchProportions } from '../http/productAPI';
import {createType} from '../http/typeAPI';
import { VictoryPie } from "victory-pie";


const CreateGraph= ({idRecipe, show, onHide}) => {
    
    const [name, setName] = useState('')
    const myData = [

        { x: "Белки", y: idRecipe.protein },
        { x: "Углеводы", y: idRecipe.carb },
        { x: "Жиры", y: idRecipe.fat },
      ];


    return (
        
        <Modal 
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered contentClassName="pr">
        <Container className="form">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Отношение КБЖУ
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                
            <VictoryPie data={myData} colorScale={["blue", "yellow", "red"]} radius={80} />

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default CreateGraph;