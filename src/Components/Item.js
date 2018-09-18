import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Item.css';
const Item = ({ to, icon, item, outside }) => {
    return (
        <div className="item">
            {outside === false ? (
                <Link to={to}>
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={icon} /> {item}
                    </button>
                </Link>
            ) : (
                <a href={ to }>
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon={ icon } /> { item }
                    </button >
                </a>
            )}
        </div>
    );
}
 
export default Item;