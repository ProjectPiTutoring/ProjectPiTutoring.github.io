import React from 'react';
import './Choice.css';

const Choice = ({ question, selected, image, select, onSelect }) => {
    return (
        <div className="col-md-6" onClick={() => onSelect(select)}>
            <div className={selected ? "card border-primary mb-3 choice selected" : "card border-primary mb-3 choice"}>
                <div className="card-body">
                    <h4 className="card-title">{question}</h4>
                    {image && (<img style={{height: 'auto', width: '100%', display: 'block'}} src={process.env.REACT_APP_PROJECT_PI_SERVER+image} alt={question} />)}
                </div>
            </div>
        </div>
    );
}

export default Choice;