import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Item from '../Components/Item';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import bugsnag from 'bugsnag-js';
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);

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
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER + '/cat').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (
                    <Item key={item} to={'/' + item} icon={faFolder} outside={false} item={item} />
                );
            })
            this.setState({ files: html, downloaded: true });
        }).catch((err) => {
            bugsnagClient.notify(err);
            this.setState({ ping: false });
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
                        this.state.ping === false ? (
                            <div>
                                <h1>An Error Occurred</h1>
                                <p>Please try again later. Rest assured, our developers will be notified of this issue.</p>
                                <p>If you have any questions or concerns, please do not hesitate to contact our <a href="https://m.me/ProjectPiTutoring">Facebook Page</a>.</p>
                            </div>
                        ) : (
                            <div className="loading">
                                <center><ReactLoading type={ 'spin' } color={ '#222f3e' } /></center>
                            </div>
                        )
                    )
                }
            </div>
        );
    };
}

export default SetStructure;