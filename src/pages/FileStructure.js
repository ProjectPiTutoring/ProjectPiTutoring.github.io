import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Item from '../Components/Item';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class FileStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            notFound: false,
            downloaded: false,
        }
    }
    componentDidMount() {
        let set = this.props.match.params.set;
        let type = this.props.match.params.type;
        let topic = this.props.match.params.topic;
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER + '/cat/' + set + '/' + type + '/' + topic).then(results => { return results.json() }).then(data => {
            if (data.length > 0) {
                let html = data.map((item) => {
                    return (
                        <Item key={item._id} to={process.env.REACT_APP_PROJECT_PI_SERVER + "/download/" + item.fileCode} outside={true} icon={faFileAlt} item={item.subTopic} />
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
                                <Link to={'/' + this.props.match.params.set}><button className="btn btn-link">{this.props.match.params.set}</button></Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <Link to={'/' + this.props.match.params.set + '/' + this.props.match.params.type}><button className="btn btn-link">{this.props.match.params.type}</button></Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" disabled>{this.props.match.params.topic}</button>
                            </li>
                        </ol>
                        {this.state.notFound === false && (<h3>Please select a file to download:</h3>)}
                        {this.state.files}
                        <br />
                        <br />
                        <Link to={'/' + this.props.match.params.set + '/' + this.props.match.params.type}>
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

export default FileStructure;