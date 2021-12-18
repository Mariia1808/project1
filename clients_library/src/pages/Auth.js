import React, {useContext, useState} from 'react';
import { Container, Form, Card, Button, Row } from "react-bootstrap";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import {login, registration} from "../http/userAPI";
import { observer } from 'mobx-react-lite';
import "../css.css";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
const clientId = "225202864346-k01k8j33vmutqn1nn0hforpo2alvv8va.apps.googleusercontent.com"

const Auth = observer(() => {
    
    const [loading, setLoading] = useState('Loading...');
  const [users, setUser] = useState(null);
 
  
    const history = useHistory()
    const location = useLocation()
    const {user} = useContext(Context)

    const isLogin = location.pathname === LOGIN_ROUTE
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const storedToken = localStorage.getItem("token");
    if (storedToken){
        let decodedData = jwt_decode(storedToken, { header: true });
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data)
            } else {
                data = await registration(name, email, password);
                data = await login(email, password);
            }
            user.setUser(users)
            user.setIsAuth(true)
            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

        return (
        <Container 
            className="tbody"
            style={{height: window.innerHeight-54}}> 
           
            <Card style={{width:833}} className={isLogin ? "log": "reg"}>
                <h2 className = "authreg">{isLogin ? 'Авторизация': "Регистрация"}</h2>
                <Form>
                    {isLogin? 
                    <div>
                    <Form.Control
                        className="pole"
                        placeholder="Введите ваш email..."
                        id="p1"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="pole"
                        placeholder="Введите ваш пароль..."
                        id="p2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    </div>
                    :
                    <div>
                    <Form.Control
                        className="pole"
                        placeholder="Ваше имя..."
                        id="p1"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="pole"
                        placeholder="Введите ваш email..."
                        id="p6"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="pole"
                        placeholder="Введите пароль..."
                        id="p7"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form.Control
                        className="pole"
                        placeholder="Повторите пароль..."
                        id="p8"
                    />
                    </div>
                    }
                    <Row className="butreg">
                        {isLogin?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Создать аккаунт</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                        </div>
                        }
                        <Button className="vhodreg"
                        onClick={click}
                        variant={"outline-succes"}>
                            {isLogin? "Войти" : "Регистрация"}
                        </Button>
                        
                    </Row>
                    
                </Form>
                </Card><Card>
            </Card>
        </Container>
    );
    
});

export default Auth;
