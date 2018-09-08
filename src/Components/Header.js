import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return(
            <div className="view">
                <div className="newJumbotron">
                    <div className="container">
                        <img src="logo.png" alt="Project Pi Logo" className="logo" />
                        <p>Project π combines Mathematics and the accessibility of social media to create a unique learning experience.</p>
                        <p>More files will be uploaded daily! Stay tuned.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;