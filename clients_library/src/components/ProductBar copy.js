import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import { observer } from 'mobx-react-lite';
//import RecipeStore from "../store/RecipeStore";
import {Button, Container} from "react-bootstrap";
import "../css.css"
import { fetchProducts } from '../http/productAPI';

const ProductBar = observer(() => {
    const{recipe} = useContext(Context)
    useEffect(() =>{
        fetchProducts().then(data => recipe.setProducts(data))
    },[])
    let i=0
    return (
        <Container className="productbar">
            <h2 className="prod">Продукты</h2>
        {recipe.products.map(product =>
                { i += 1
                return <Button 
                    className={i <= 10 ? 'product' : 'type1'}
                    variant={"outline-light"}
                    style={{cursor:'pointer'}}
                    active={product.id === recipe.selectedProduct.id}
                    onClick={()=> recipe.setSelectedProduct(product)}
                    key={product.id}
                >
                        {product.name}
                </Button>}
            )}
        </Container>
    );

});

export default ProductBar;