import React, { useContext, useState } from 'react';
import {Button, Form, Row, Col, Container} from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import '../css.css';
import { createRecipe, fetchRecipes } from '../http/recipeAPI';




const CreateRecipe = ({show, onHide}) => {
    const {recipe} = useContext(Context)
   
    
    // const selectFile = e => {
    //     setFile(e.target.files[0])
    // }
    
    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [complex, setComplex] = useState('')
    const [time, setTime] = useState('')
    const [file, setFile] = useState(null)
    const [profile_mini, setProfile_mini] = useState('')
    const [profile, setProfile] = useState('')
    const [kcal, setKcal] = useState('')
    const [protein, setProtein] = useState('')
    const [carb, setCarb] = useState('')
    const [fat, setFat] = useState('')
    const [cr, setCr] = useState(true)
    //const [rate, setRate] = useState('')
    //const rate = 0
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const addRecipe = () =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('time', time)
        formData.append('complex', complex)
        formData.append('profile_mini', profile_mini)
        formData.append('profile', profile)
        //formData.append('rating', rate)
        formData.append('img', document.getElementById('ze_best_file').files[0])
        formData.append('kcal', kcal)
        formData.append('protein', protein)
        formData.append('fat', fat)
        formData.append('carb', carb)
        formData.append('typeId', parseInt(type))
        formData.append('userId', parseInt(decodedData.id))
        formData.append('info', JSON.stringify(info))
        // formData.append('info', JSON.stringify(info))
        createRecipe(formData).then(data => onHide())
        fetchRecipes(data => recipe.setRecipes(data)).then()
        return setName(''), setType(''),setComplex(''), setTime(''),
        setFile(null),setProfile_mini(''),setProfile(''), setKcal(''),
        setProtein(''), setCarb(''), setFat('')



    }
    
    const addInfo = () => {
        setInfo([...info, {product: '', kolvo: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const kalories =()=>{
        setCr(false)
        let k = 0
        let p = 0
        let f = 0
        let c = 0
        let kol = 0
        let sum = 0
        info.map(type=>{
            recipe.products.map(types=>{
                if(parseInt(types.id) === parseInt(type.product))
                {k += parseInt(types.kcal)
                p += parseInt(types.protein)
                f += parseInt(types.fat)
                c += parseInt(types.carb)
                kol += parseInt(type.kolvo)}
            })
            
        })
        
        return setKcal((((parseInt(k)*100))/parseInt(kol)).toFixed(0)), setCarb((((parseInt(c)*100))/parseInt(kol)).toFixed(0)),
        setFat((((parseInt(f)*100))/parseInt(kol)).toFixed(0)),setProtein((((parseInt(p)*100))/parseInt(kol)).toFixed(0)), setCr(false)
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
                Добавление рецепта
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={"Введите название рецепта"}/>
               
                <hr/>

               
                <Form.Control as="select" value={type} onChange={e => setType(e.target.value)} defaultValue="Тип блюда...">
                            <option>Выберите тип</option>
                            {recipe.types.map(type =>
                                <option value={type.id}>{type.name}</option>
                            )}
                         </Form.Control>
                   




                <Form.Control as="select" value={time} onChange={e => setTime(e.target.value)} defaultValue="Время приготовления...">
                        <option>Выберите время</option>
                        <option  value='15'>15</option>
                        <option  value='30'>30</option>
                        <option  value='45'>45</option>
                        <option  value='60'>60</option>  
                </Form.Control>
               
                <Form.Control as="select" value={complex} onChange={e => setComplex(e.target.value)} defaultValue="Сложность...">
                <option>Выберите сложность</option>
                <option  value='легко'>Легко</option>
                <option  value='средне'>Средне</option>
                <option  value='сложно'>Сложно</option>  
                </Form.Control>
                               
                    <Form.Control className="mt-3" type="multiline" as="textarea" rows={3} value={profile_mini}  onChange={e => setProfile_mini(e.target.value)} placeholder="Введите краткое описание рецепта"/>
                <Form.Control className="mt-3" type="multiline" as="textarea" rows={7} value={profile}  onChange={e => setProfile(e.target.value)} placeholder="Введите рецепт"/>
                {/* <Form.Control className="mt-3" type="multiline" value={rate} onChange={e => setRate(e.target.value)} placeholder="Рейтинг"/> */}
                <Form.Control className="mt-3" type="file" value={file}  id="ze_best_file" onChange={e => setFile(e.target.value)}/>
                <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить продукт
                    </Button>  
                {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            
                            <Col md={4}>

                            <Form.Control as="select" value={i.product} onChange={(e) => changeInfo('product', e.target.value, i.number)} defaultValue="Продукт...">
                                <option>Выберите продукт</option>
                                {recipe.products.map(product =>
                                <option value={product.id}>{product.name}</option> 
                                )}
                            </Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.kolvo}
                                    onChange={(e) => changeInfo('kolvo', e.target.value, i.number)}
                                    placeholder="Введите количество"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}

                 
              
                 <hr/>
                 <Form.Control className="mt-3" disabled value={kcal} placeholder="Каллории" />
                 <Form.Control className="mt-3" disabled value={protein} placeholder="Белки"/>
                 <Form.Control className="mt-3" disabled value={fat} placeholder="Жиры"/>
                 <Form.Control className="mt-3" disabled value={carb} placeholder="Углеводы"/>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button className="recbut" onClick={kalories}>Рассчитать</Button>
            <Button className="recbut" onClick={onHide}>Закрыть</Button>
            <Button className="recbut" disabled={cr} onClick={addRecipe}>Добавить</Button>
        </Modal.Footer>
        </Container></Modal>
    );
  }
  
export default CreateRecipe;