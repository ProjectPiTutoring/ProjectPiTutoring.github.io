import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class TopicStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
        }
    }
    componentDidMount() {
        let type = this.props.match.params.type;
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER + '/cat/' + type).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (
                    <Link key={item} to={'/'+type+'/'+item}>
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
                                <Link to="/"><button className="btn btn-link">Project Pi</button></Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" disabled>{this.props.match.params.type}</button>
                            </li>
                        </ol>
                        <h3>For what topic?</h3>
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
                        <div className="loading">
                            <center><ReactLoading type={'spin'} color={'#222f3e'} /></center>
                        </div>
                    )
                }
            </div>
        );
    };
}

export default TopicStructure;