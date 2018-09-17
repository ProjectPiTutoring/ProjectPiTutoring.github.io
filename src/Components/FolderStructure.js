import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class FolderStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            whereami: 0,
            type: null,
            topic: null
        }
    }
    componentDidMount() { this.backToStart(); }
    backToStart() {
        this.setState({ type: null, topic: null, downloaded: false, whereami: 0 });
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER+'/cat').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (<button key={item} className="btn btn-primary" onClick={this.selectType.bind(this)} data-type={item}><FontAwesomeIcon icon={faFolder}/> {item}</button>)
            })
            this.setState({ files: html, downloaded: true });
        });
    }
    selectType(event) {
        let type = event.target.dataset.type;
        this.setState({downloaded: false, topic: null, whereami: 1});
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER+'/cat/' + type).then(results => {return results.json()}).then(data => {
            let html = data.map((item) => {
                return (<button key={item} className="btn btn-primary" onClick={this.selectTopic.bind(this)} data-topic={item}><FontAwesomeIcon icon={faFolder}/> {item}</button>)
            })
            this.setState({ files: html, downloaded: true, type: type });
        });
    }
    selectTopic(event) {
        let topic = event.target.dataset.topic;
        this.setState({ downloaded: false, whereami: 2 });
        fetch(process.env.REACT_APP_PROJECT_PI_SERVER+'/cat/' + this.state.type + '/' + topic).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (<a href={process.env.REACT_APP_PROJECT_PI_SERVER + "/download/" + item.fileCode} key={item}><button className="btn btn-primary"><FontAwesomeIcon icon={faFileAlt} /> {item.subTopic}</button></a>)
            })
            this.setState({ files: html, downloaded: true, topic: topic });
        });
    }
    render() {
        return(
            <div className="container">
                {this.state.downloaded ? (
                    <div>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" onClick={this.backToStart.bind(this)} disabled={this.state.whereami === 0} >Project Pi</button>
                            </li>
                            {this.state.whereami > 0 && (
                                <li className="breadcrumb-item active">
                                    <button className="btn btn-link" onClick={this.selectType.bind(this)} data-type={this.state.type} disabled={this.state.whereami === 1}>{this.state.type}</button>
                                </li>
                            )}
                            {this.state.whereami > 1 && (
                                <li className="breadcrumb-item active">
                                    <button className="btn btn-link" disabled={this.state.whereami === 2}>{this.state.topic}</button>
                                </li>
                            )}
                        </ol>
                        {this.state.whereami === 0 ?
                            (<h3>Hi there! What are you looking for?</h3>) :
                            (this.state.whereami === 1 ?
                                (<h3>For what topic?</h3>) :
                                (<h3>Please select a file to download:</h3>)
                            )
                        }
                        {this.state.files}
                        <br />
                        <br />
                        {this.state.whereami !== 0 && (
                                this.state.whereami === 1 ?
                                    (<button className="btn btn-secondary" onClick={this.backToStart.bind(this)}>Go Back</button>) :
                                    (<button className="btn btn-secondary" onClick={this.selectType.bind(this)} data-type={this.state.type}>Go Back</button>)
                            )
                        }
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

export default FolderStructure;