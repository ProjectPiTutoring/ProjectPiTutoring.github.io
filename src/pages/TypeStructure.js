import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class TypeStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER + '/cat').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (
                    <Link key={item} to={'/'+item}>
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faFolder} /> {item}</button>
                    </Link>
                );
            })
            this.setState({ files: html, downloaded: true });
        });
    }
    render() {
        return (
            <div className="container">
                {this.state.downloaded ? (
                    <div>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" disabled>Project Pi</button>
                            </li>
                        </ol>
                        <h3>Hi there! What are you looking for?</h3>
                        {this.state.files}
                        <br />
                        <br />
                        <Link to="/list">
                            <button className="btn btn-secondary">Show All Files/Search</button>
                        </Link>
                    </div>
                ) : (
                        <div className="loading">
                            <center><ReactLoading type={'spin'} color={'#222f3e'} /></center>
                        </div>
                    )
                }
            </div>
        );
    };
}

export default TypeStructure;