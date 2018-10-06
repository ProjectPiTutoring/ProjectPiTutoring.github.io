import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Item from '../Components/Item';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import bugsnag from 'bugsnag-js';
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);

class TypeStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            ping: null
        }
    }
    componentDidMount() {
        let set = this.props.match.params.set;
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER + '/cat/'+set).then(results => { return results.json() }).then(data => {
            if (data.length > 0) {
                let html = (<h3>What kind of file are you looking for?</h3>) + data.map((item) => {
                    return (
                        <Item key={item} to={'/' + set + '/' + item} outside={false} icon={faFolder} item={item} />
                    );
                })
                this.setState({ files: html, downloaded: true });
            }
            else {
                let html = (
                    <div>
                        <h3>Not found.</h3>
                        <p>We are unable to find what are you looking for. Perhaps going back to the homepage might help.</p>
                    </div>
                );
                this.setState({ files: html, notFound: true, downloaded: true });
            }
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
                                <Link to="/"><button className="btn btn-link">Project Pi</button></Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" disabled>{this.props.match.params.set}</button>
                            </li>
                        </ol>
                        {this.state.files}
                        <br />
                        <br />
                        <Link to="/">
                            <button className="btn btn-secondary">Go Back</button>
                        </Link>
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
                                    <center><ReactLoading type={'spin'} color={'#222f3e'} /></center>
                                </div>
                            )
                    )
                }
            </div>
        );
    };
}

export default TypeStructure;