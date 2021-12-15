import React, {useContext} from 'react';
import {Context} from "../index";
import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
//import RecipeStore from "../store/RecipeStore";

const TypeBar = observer(() => {
    const{recipe} = useContext(Context)
    return (
        <ListGroup>
            {recipe.types.map(type =>
                <ListGroup.Item 
                    style={{cursor:'pointer'}}
                    active={type.id === recipe.selectedType.id}
                    onClick={()=> recipe.setSelectedType(type)}
                    key={type.id}
                >
                        {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );

});

export default TypeBar;