import React, { Component } from 'react';
import { ErrorPage, Item, Loading } from '../Components';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class SetStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            ping: null
        }
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/cat`).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (
                    <Item key={item} to={`/${item}`} icon={faFolder} outside={false} item={item} />
                );
            })
            this.setState({ files: html, downloaded: true });
        }).catch((err) => { this.setState({ ping: false, err }) });
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
                ) : (this.state.ping === false ? (<ErrorPage err={this.state.err} />) : (<Loading />))}
            </div>
        );
    };
}

export default SetStructure;