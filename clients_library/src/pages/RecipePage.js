import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {fetchFavorite, fetchOneRecipe, updateKcal } from '../http/recipeAPI';
import { fetchTypes } from '../http/typeAPI';
import { CSVLink } from "react-csv";
import { fetchProducts, fetchProportions } from '../http/productAPI';
import DeleteAndUpdateRecipe from '../modals/UpdateRecipe';
import { fetchUser } from '../http/userAPI';
import jwt_decode from "jwt-decode";
import { createFavorite, fetchFavorites } from '../http/favoriteAPI';
import { createCook, fetchCooks } from '../http/cookAPI';
import { createRatings, deleteRatings, fetchRatings, updateRatings } from '../http/ratingsAPI';
import star from "../assets/rate2.png"
import CreateGraph from '../modals/CreateGraph';
//import { fetchRecipekcals } from '../http/recipekcalsAPI';



const RecipePage = observer(() => {
    
    const [recipes, setRecipe] = useState({info:[]})

    //const [recipekcal, setRecipekcals] = useState({info:[]})
    const [DelAndUpRecipeVisible, setDelAndUpRecipeVisible] = useState(false)
    const [CreateGraphVisible,setCreateGraphVisible] = useState(false)
    let [fav,setFav] = useState(false)
    let [co,setCook] = useState(false)
    let [Id, setId] = useState(0)
    let [numbers, setNumbers] = useState(0)
    let [rated1, setRated1] = useState(false)
    let [rated2, setRated2] = useState(false)
    let [rated3, setRated3] = useState(false)
    let [rated4, setRated4] = useState(false)
    let [rated5, setRated5] = useState(false)
    let [rated6, setRated6] = useState(true)
    const {recipe} = useContext(Context)
    const {user} = useContext(Context)
    const {rating} = useContext(Context)
    const {id} = useParams()
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    useEffect(()=>{
        fetchOneRecipe(id).then(data => setRecipe(data))
        fetchTypes().then(data => recipe.setTypes(data))
        fetchProducts().then(data => recipe.setProducts(data))
        fetchProportions().then(data => recipe.setProportions(data))
        fetchUser().then(data=>recipe.setUser(data))
        fetchFavorites().then(data=>recipe.setFavorites(data.rows))
        fetchRatings().then(data=>rating.setRatings(data))
        disFav()
        

        //fetchRecipekcals().then(data => recipe.setRecipekcals(data))
    },[])

    //console.log(recipe)

    let disFav = ()=>
    {
        fetchFavorite(id, decodedData.id).then(data => {
        console.log(data[0])
        console.log(data[1])
        console.log(data[2])
        
        if(data[0] != null)
        {setFav(true)}

        if(data[1] != null)
        {setCook(true)}

        if(data[2] != null)
        {ifRated(data[2].rate)
        setId(data[2].id)
        setNumbers(data[2].rate)
        setRated6(false)}
    
        })
    }
  
    const favorit = () => {
        setFav(true)
        let favo = false
        const formData = new FormData()
        formData.append('recipeId', parseInt(recipes.id))
        formData.append('userId', parseInt(decodedData.id))
        createFavorite(formData).then()
    }
    const cooked = () => {
        setCook(true)
        let c = false
        const formData1 = new FormData()
        formData1.append('userId', parseInt(decodedData.id))
        formData1.append('recipeId', parseInt(recipes.id))
        createCook(formData1).then()
    }
       

    const createCsvTable = (csvData) => {
        csvData.push(['name', 'time', 'complex',
            'profile_mini', 'profile', 'rating',
            'kcal', 'protein', 'fat', 'carb','typeId'])
        let rowAr = [];
        recipe.recipes.map(publ =>{
            if (publ.id === parseInt(recipes.id))
            {
            rowAr = []
            rowAr.push("'"+publ.name.toString()+"'")
            rowAr.push("'"+publ.time.toString()+"'")
            rowAr.push("'"+publ.complex.toString()+"'")
            rowAr.push("'"+publ.profile_mini.toString()+"'")
            rowAr.push("'"+publ.profile.toString()+"'")
            rowAr.push("'"+publ.kcal.toString()+"'")
            rowAr.push("'"+publ.protein.toString()+"'")
            rowAr.push("'"+publ.fat.toString()+"'")
            rowAr.push("'"+publ.carb.toString()+"'")
            rowAr.push("'"+recipe.types.find((a) => a.id === publ.typeId).name.toString()+"'")
            }
            csvData.push(rowAr)
            }
        )

        return csvData
    }
    
    const csvData = [
    ];
    
    const ifRated =(number)=>{
        if(parseInt(number)===5){
            setRated1(true)
            setRated2(true)
            setRated3(true)
            setRated4(true)
            setRated5(true)
        }
        else if(parseInt(number)===4){
            setRated1(true)
            setRated2(true)
            setRated3(true)
            setRated4(true)
        }
        else if(parseInt(number)===3){
            setRated1(true)
            setRated2(true)
            setRated3(true)
        }
        else if(parseInt(number)===2){
            setRated1(true)
            setRated2(true)
        }
        else if(parseInt(number)===1){
            setRated1(true)
        }
    }

    const rated =(number)=>{ 
        let c = false
        const formData1 = new FormData()
        const formData = new FormData()
        setRated6(false)
        formData1.append('rate', parseInt(number))
        formData1.append('userId', parseInt(decodedData.id))
        formData1.append('recipeId', parseInt(recipes.id))
        formData1.append('rates', parseFloat(meanMark(recipes.id, number)))
        recipe.ratings.map(items =>{
            if((parseInt(items.recipeId)===parseInt(recipes.id)) && (parseInt(items.userId) === parseInt(decodedData.id)))
           { c=true
             ifRated(items.rate)
            } 
            })
            if(c === false)
            { 
                ifRated(number)
                createRatings(formData1).then()
               
            } 
    }
    const delrated =()=>{ 
        
        const formData2 = new FormData()
        setRated6(true)
        setRated1(false)
        setRated2(false)
        setRated3(false)
        setRated4(false)
        setRated5(false)
       
        // formData2.append('recipeId', parseInt(recipes.id))
        // console.log(meanMark1(recipes.id, numbers))
        // formData2.append('rates', parseFloat(meanMark1(recipes.id, numbers)))
        deleteRatings(decodedData.id, parseInt(recipes.id), parseFloat(meanMark1(recipes.id, numbers))).then()
    }
    const recVis=()=>{
        setDelAndUpRecipeVisible(true)
    }

    const meanMark = (recipesId, number) =>{
        let count = 1
        let sum = parseInt(number)
        
        rating.ratings.map(items => {
            if (items.recipeId === parseInt(recipesId))
            {
                count += 1
                sum += parseFloat(items.rate)
            }
        })
        return (sum/(count))
    }
    const meanMark1 = (recipesId, number) =>{
        let count = 0
        let sum = 0
        
        rating.ratings.map(items => {
            if (items.recipeId === parseInt(recipesId))
            {
                count += 1
                sum += parseFloat(items.rate)
            }
        })
        sum = sum - parseInt(number)
        count = count - 1
        if(count === 0)
        count =1
        return (sum/(count))
    }

        return (
            <Container
            className="tbody">
                    <div>
                    {recipe.setSelectedType('')}
                    <div className='md-4'>
                    <Image className="photo" width={300} height={300} src={'http://localhost:5000/recipe/'+ recipes.id +'/'+ recipes.img}/>
                 
                    <div className="step">
                    <h2 className="steps">Этапы приготовления</h2>
                    <text>{recipes.profile}</text>
                    </div>
                    </div><div className='md-4'>
                    <div className="info">
                        {user.isAuth?<>
                        <Button  variant={"outline-light"} value={recipes.id} disabled={fav} onClick={favorit} className="favorite"/>
                        <Button  variant={"outline-light"} value={recipes.id} disabled={co}  onClick={cooked} className="cook"/>
                        <Button  variant={"outline-light"} value={1} disabled={rated1} onClick={e => rated(e.target.value)} className="rates"/>
                        <Button  variant={"outline-light"} value={2} disabled={rated2} onClick={e => rated(e.target.value)} className="rates"/>
                        <Button  variant={"outline-light"} value={3} disabled={rated3} onClick={e => rated(e.target.value)} className="rates"/>
                        <Button  variant={"outline-light"} value={4} disabled={rated4} onClick={e => rated(e.target.value)} className="rates"/>
                        <Button  variant={"outline-light"} value={5} disabled={rated5} onClick={e => rated(e.target.value)} className="rates"/>
                        <Button  variant={"outline-light"} value={5} disabled={rated6} onClick={e => delrated()} className="rates0"/></>
                    :<></>}

                    <Button className="export"><CSVLink class="dropdown-item" data={createCsvTable(csvData)} >Скачать рецепт</CSVLink></Button>
                    <h2 className="namerec1">{recipes.name}</h2>
                    <div className="raterec"> <text>{recipes.rate}</text> </div> 
                    <text className="descript_mini">{recipes.profile_mini}</text>
                    
                    <div className="xar">
                    <p className="textinfo">Категория
                    {recipe.types.map(items => {
                        if (items.id === parseInt(recipes.typeId))
                            return <text className="infotext"> {items.name}</text>
                    })}</p>
                    
                    <p className="textinfo">Время приготовления
                    <text className="infotext">{recipes.time}</text></p>
                    <div id="col2">
                    <p className="textinfo">Сложность
                    <text className="infotext" >{recipes.complex}</text></p>
                    
                    <p className="textinfo">Калории  
                    <text className="infotext"> {recipes.kcal}</text></p>                    
                    </div></div></div>

                    <div className="decriptrec">
                        <p className='spisok'>Список продуктов</p>
                        <div className="product1">
                            {recipe.proportions.map(proportion => {
                                if (recipes.id === parseInt(proportion.recipeId))
                                    return <p className="kolvo" key={proportion.id}>
                                        {recipe.products.map(products => {
                                            if (products.id === proportion.productId)
                                            return <Row><Col md={7}><text className="prodtext">
                                            {products.name}<hr/></text></Col><Col> <text className="prodtext">{proportion.kolvo} грамм<hr/></text></Col></Row>  
                                        }
                                    )}
                                    </p>
                            }
                        )}


                        </div>
                    </div>
                    <div className="calor">
                        <p className='spisok'>Калории</p>
                            <div className="spcal">
                            <text className=""><Row><Col md={7}><p>Калории </p></Col> <Col><p>{recipes.kcal}</p></Col></Row><hr/>
                            <Row><Col md={7}><p>Белки </p></Col> <Col><p> {recipes.protein}</p></Col></Row><hr/>
                            <Row><Col md={7}><p>Жиры </p></Col> <Col><p> {recipes.fat}</p></Col></Row><hr/>
                            <Row><Col md={7}><p>Углеводы </p></Col> <Col><p> {recipes.carb}</p></Col></Row>
                            </text>
                            <Button variant={"outline-light"}  className="lol" onClick={()=> setCreateGraphVisible(true)}>Посмотреть график</Button>
                            <CreateGraph idRecipe={recipes} show={CreateGraphVisible} onHide={()=> setCreateGraphVisible(false)}/>
                    </div></div>
                   
                    </div>
                </div>
                {user.isAuth? (recipes.userId === parseInt(decodedData.id))?
                <div>
                <Button variant={"outline-light"}  className="lol" onClick={recVis}>Редактировать рецепт</Button>
                <DeleteAndUpdateRecipe idRecipe={recipes} show={DelAndUpRecipeVisible} onHide={()=> setDelAndUpRecipeVisible(false)}/>
                   </div> :
                    <div></div>  
                    :
                    <div></div>       
                 
                }
            <div className="prtype"></div>
            </Container>



        );
    
});

export default RecipePage;