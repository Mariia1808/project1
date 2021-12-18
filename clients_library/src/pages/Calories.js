import React from 'react';
import { Container, Image } from 'react-bootstrap';
import ops from "../assets/ops.jpg";
import "../css.css"

const Calories = () => {
        return (
          <Container className='tbody'>
            <div className='d'>
                <Image className='ops' src={ops}/>
            </div>
          </Container>
        );
    
};

export default Calories;