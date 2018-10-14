import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from "./logo.png";

class Header extends Component {
    render() {
        return(
            <div className="view">
                <div className="newJumbotron">
                    <div className="container">
                        <img src={Logo} alt="Project Pi Logo" className="logo" />
                        <p>Project π combines Mathematics and the accessibility of social media to create a unique learning experience.</p>
                        <p>More files will be uploaded daily! Stay tuned.</p>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <p></p>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/about"}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/contact"}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;