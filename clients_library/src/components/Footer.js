import React from 'react';
import { Button, Container } from 'react-bootstrap';


const Footer = () => {
        return (
            <Container className="foot" >
                 Copyright © 2021 mvbannikova@1808gmail.com &emsp;&emsp;&emsp;
                 <Button variant={"outline-light"} className='footer' href="https://vk.com/mvbannikova"/>
            </Container>
        );
    
};

export default Footer;