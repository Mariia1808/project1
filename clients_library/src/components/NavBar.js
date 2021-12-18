import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {CALORIES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USER_ROUTE } from '../utils/consts';
import { useHistory} from 'react-router-dom';
import {Button, Container, Image} from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import Logotip from "../assets/Logotip.png";
import "../css.css"
import { fetchTypes } from '../http/typeAPI';
import jwt_decode from "jwt-decode";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const{recipe} = useContext(Context)
    useEffect(() =>{
        fetchTypes().then(data => recipe.setTypes(data))
    },[])
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    

    return (
        
        <Navbar variant="dark" className="navbar0">
            <Container className="d-flex justify-content-center align-items-center">
            <Nav className="ml-auto">
                <Button className="main" id="d1" variant={"outline-light"} onClick={() => history.push(MAIN_ROUTE)} >Главная</Button>
                <Button className="main" id="d2" variant={"outline-light"} onClick={() => history.push(CALORIES_ROUTE)} >Подсчет калорий</Button>
                <Image className="logo" src={Logotip}/>
                {user.isAuth?
                <Nav className="ml-auto ">
                    <Button className="main" id="d3" variant={"outline-light"} onClick={()=> history.push(USER_ROUTE+'/'+decodedData.id)}>Кабинет</Button>
                    <Button className="main" id="d4" variant={"outline-light"} onClick={() => user.setIsAuth(false)}>Выход</Button>
                </Nav>
                    :
                <Nav className="ml-auto">
                    <Button className="main" id="d5" variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Вход</Button>
                </Nav>
                }
                
            </Nav>
            <h2 className="textlogo"> Книга рецептов </h2>
        
        </Container>
        <Container className="navbar2">
        {recipe.types.map(type =>
                <Button 
                    className={type.id <= 5 ? 'type' : 'type1'}
                    variant={"outline-light"}
                    style={{cursor:'pointer'}}
                    active={type.id === recipe.selectedType.id}
                    onClick={()=> recipe.setSelectedType(type)}
                    key={type.id}
                >
                        {type.name}
                </Button>
            )}
        </Container>
        </Navbar>
    );
})

export default NavBar