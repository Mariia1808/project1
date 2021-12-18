import React, { useContext, useState } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import '../css.css';


const DeleteAndUpdateRecipe = ({idRecipe, show, onHide}) => {
    const {recipe} = useContext(Context)
    const [name, setName] = useState(idRecipe.name)
    const [type, setType] = useState(idRecipe.typeId)
    const [complex, setComplex] = useState(idRecipe.complex)
    const [time, setTime] = useState(idRecipe.time)
    const [file, setFile] = useState(null)
    const [profile_mini, setProfile_mini] = useState(idRecipe.profile_mini)
    const [profile, setProfile] = useState(idRecipe.profile)
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const updateRecipe = () =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('time', time)
        formData.append('complex', complex)
        formData.append('profile_mini', profile_mini)
        formData.append('profile', profile)
        formData.append('img', document.getElementById('ze_best_file').files[0])
        formData.append('typeId', parseInt(type))
        updateRecipe(formData).then(data => onHide())

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
            Редактирование рецепта 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Control value={idRecipe.name} onChange={e => setName(e.target.value)} placeholder={"Введите название рецепта"}/>
               
                <Form.Control as="select" value={idRecipe.type} onChange={e => setType(e.target.value)} defaultValue="Тип блюда...">
                            {recipe.types.map(type =>
                                <option value={type.id}>{type.name}</option>
                            )}
                         </Form.Control>
                   

                        


                <Form.Control as="select" value={idRecipe.time} onChange={e => setTime(e.target.value)} defaultValue="Время приготовления...">
                        <option value='15'>15</option>
                        <option value='30'>30</option>
                        <option value='45'>45</option>
                        <option value='60'>60</option>  
                </Form.Control>
                <Form.Control as="select" value={idRecipe.complex} onChange={e => setComplex(e.target.value)} defaultValue="Сложность...">
                <option value='легко'>Легко</option>
                <option value='средне'>Средне</option>
                <option value='сложно'>Сложно</option>  
                </Form.Control>
                               
                    <Form.Control className="mt-3" type="multiline" as="textarea" rows={3} value={idRecipe.profile_mini} onChange={e => setProfile_mini(e.target.value)} placeholder="Введите краткое описание рецепта"/>
                <Form.Control className="mt-3" type="multiline" as="textarea" rows={7} value={idRecipe.profile} onChange={e => setProfile(e.target.value)} placeholder="Введите рецепт"/>
                {/* <Form.Control className="mt-3" type="multiline" value={rate} onChange={e => setRate(e.target.value)} placeholder="Рейтинг"/> */}
                <Form.Control className="mt-3" type="file" value={file} id="ze_best_file" onChange={e => setFile(e.target.value)}/>
            
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" onClick={updateRecipe}>Обновить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default DeleteAndUpdateRecipe;