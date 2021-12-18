import { Container, Row, Col, Button, Form, Navbar} from "react-bootstrap";
import "../css.css";
import React, { useContext, useEffect, useState } from 'react';
import RecipeList from "../components/RecipeList";
import { useHistory } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { RECIPES_ROUTE } from "../utils/consts";
import time1 from "../assets/2278023 (1).png";
import time2 from "../assets/2278021 (1).png";
import time3 from "../assets/2278019 (1).png";
import time4 from "../assets/2278024 (1).png";
import RecipeListFilter from "../components/RecipeListFilter";
import ProductBar from "../components/ProductBar";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { Context } from "..";
import { fetchRecipes, fetchTypes } from "../http/recipeAPI";
import { fetchProducts } from "../http/productAPI";
import RecipeListPopular from "../components/RecipeListPopular";

const Main = observer(() => {
    const history = useHistory()
    const [complex, setComplex] = useState('')
    const [time, setTime] = useState('')
    const [kcal, setKcal] = useState('')
    const [but, setBut] = useState(false)

    const reset = () =>{
        return setBut(false), setComplex(''), setTime(''),setKcal(''),recipe.setSelectedType('')
    }
    const {recipe}=useContext(Context)
    useEffect(()=>{
            fetchTypes().then(data=>recipe.setTypes(data))
            fetchProducts().then(data=>recipe.setProducts(data))
            fetchRecipes(null, null, 1, null).then(data=> {
                    recipe.setRecipe(data.rows)
                    recipe.setTotalCount(data.count)
            })
    },[])
    useEffect(()=>{
            fetchRecipes(recipe.selectedType.id, recipe.page, recipe.limit, 3).then(data=> {
                    recipe.setRecipe(data.rows)
                    recipe.setTotalCount(data.count)
            })
    },[recipe.page, recipe.selectedType])
    // useEffect(()=>{
    //     fetchRecipes().then(data=> recipe.setRecipe(data.rows))
    // },[])
        return (
            

            <Container
            className="tbody"> 
            
            <Container className="found">

            <Container className="time">
                <h2 className="textfound">Время приготовления: {time} минут</h2>
                <Button variant={"outline-light"} className="buttime" value={'15'} onClick={e => setTime(e.target.value)}><img src={time3} className="imgtime"/>
                    15 минут
                </Button>

                <Button variant={"outline-light"} className="buttime" value={'30'} onClick={e => setTime(e.target.value)}><img src={time2} className="imgtime"/>
                    30 минут
                </Button>

                <Button variant={"outline-light"} className="buttime" value={'45'} onClick={e => setTime(e.target.value)}><img src={time1} className="imgtime"/>
                    45 минут
                </Button>

                <Button variant={"outline-light"} className="buttime" value={'60'} onClick={e => setTime(e.target.value)}><img src={time4} className="imgtime"/>
                    60 минут
                </Button>
            </Container>
            
            <Container className="slozh">
                <h2 className="textfound">Сложность: {complex}</h2>
                <Button variant={"outline-light"} className="butslozh" value={'легко'} onClick={e => setComplex(e.target.value)}>Легко</Button>
                <Button variant={"outline-light"} className="butslozh" value={'средне'} onClick={e => setComplex(e.target.value)}>Средне</Button>
                <Button variant={"outline-light"} className="butslozh" value={'сложно'} onClick={e => setComplex(e.target.value)}>Сложно</Button>
            </Container>

            <Container className="kcal">
                <h2 className="textfound">Калорийность: {kcal}</h2>
                </Container>
                <Container className="kcal0">
                <Navbar.Text className="textkcal">50 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 1000</Navbar.Text>
                <Form.Control variant={"outline-light"} type="range" onChange={e => setKcal(e.target.value)}
                 className="range" min="50" width='50%' max="1000" step="50" id="customRange2"/>  
               
                 
            </Container>
            <Button variant={"outline-light"} className="search"  onClick={() => setBut(true)}>Поиск</Button>
            <Button variant={"outline-light"} className="search1"  onClick={reset}>Сбросить</Button>
            </Container>


            {but===true? 
            <Container className="cards">
                <h2 className="textpop">Результаты поиска</h2>
                <Row className="rows1"><Col md={9}>
            <Row className="d-flex">
                
                <RecipeListFilter Ftime={time} Fcomplex={complex} Fkcal={kcal}/>
               
            </Row>
            </Col> </Row>
            </Container>
            :
            <Container className="cards">
            <h2 className="textpop">Популярные рецепты</h2>
            <Row className="rows"><Col md={9}>
            <Row className="d-flex">
            <RecipeListPopular filter=''/>
            
            </Row>
            </Col> </Row>
            </Container>
              
            }


           
            <div className="prtype"><ProductBar/></div>
            </Container>
        );
});

export default Main;