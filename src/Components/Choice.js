import React from 'react';
import { Image, Card } from 'semantic-ui-react';

const Choice = ({ question, selected, image, select, onSelect }) => {
    return (
        <Card onClick={() => onSelect(select)} style={selected ? (styles.cardSelected) : (styles.cardDefault)}>
            {image && (<Image src={process.env.REACT_APP_PROJECT_PI_SERVER+image} alt={question} />)}
            <Card.Content>
                <Card.Header style={selected ? ({ color: "#fff" }) : ({ color: "inherit" })}>{question}</Card.Header>
            </Card.Content>
        </Card>
    );
}

const styles = {
    cardDefault: {
        transition: "0.3s",
        backgroundColor: "#fff"
    },
    cardSelected: {
        transition: "0.3s",
        backgroundColor: "#008cba",
        color:"#fff"
    }
}

export default Choice;