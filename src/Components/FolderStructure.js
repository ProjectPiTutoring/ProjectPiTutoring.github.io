import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import Repository from '../Components/Repository';

class FolderStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            whereami: 0,
            type: null,
            topic: null,
            olderView: false,
            mainLink: 'https://projectpi.phillytan.xyz'
        }
    }
    componentDidMount() {
        fetch(this.state.mainLink+'/cat').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (<button key={item} className="btn btn-primary" onClick={this.selectType.bind(this)} data-type={item}>{item}</button>)
            })
            this.setState({ files: html, downloaded: true });
        });
    }
    backToStart() {
        this.setState({ type: null, topic: null, downloaded: false, whereami: 0 });
        fetch(this.state.mainLink+'/cat').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (<button key={item} className="btn btn-primary" onClick={this.selectType.bind(this)} data-type={item}>{item}</button>)
            })
            this.setState({ files: html, downloaded: true });
        });
    }
    selectType(event) {
        let type = event.target.dataset.type;
        this.setState({downloaded: false, topic: null, whereami: 1});
        fetch(this.state.mainLink+'/cat/' + type).then(results => {return results.json()}).then(data => {
            let html = data.map((item) => {
                return (<button key={item} className="btn btn-primary" onClick={this.selectTopic.bind(this)} data-topic={item}>{item}</button>)
            })
            this.setState({ files: html, downloaded: true, type: type });
        });
    }
    selectTopic(event) {
        let topic = event.target.dataset.topic;
        this.setState({ downloaded: false, whereami: 2 });
        fetch(this.state.mainLink+'/cat/' + this.state.type + '/' + topic).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                let link = this.state.mainLink+"/download/" + item.fileCode;
                return (<a href={link}><button key={item} className="btn btn-primary">{item.subTopic}</button></a>)
            })
            this.setState({ files: html, downloaded: true, topic: topic });
        });
    }
    switchView() {
        if (this.state.olderView) this.setState({olderView: false});
        else this.setState({ olderView: true });
    }
    render() {
        return(
            <div>
                {this.state.olderView ? (
                    <div className="container">
                        <button className="btn btn-secondary" onClick={this.switchView.bind(this)}>Switch to Guided View</button>
                        <Repository />
                    </div>
                ) : (
                    <div className="container">
                        {this.state.downloaded ? (
                            <div>
                                {this.state.whereami === 0 ?
                                    (<div>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item active"><button className="btn btn-link" disabled>Project Pi</button></li>
                                        </ol>
                                        <h3>Hi there! What are you looking for?</h3>
                                    </div>) :
                                    (
                                        this.state.whereami === 1 ?
                                            (<div>
                                                <ol class="breadcrumb">
                                                    <li class="breadcrumb-item"><button className="btn btn-link" onClick={this.backToStart.bind(this)}>Project Pi</button></li>
                                                    <li class="breadcrumb-item active"><button className="btn btn-link" disabled>{this.state.type}</button></li>
                                                </ol>
                                                <h3>For what topic?</h3>
                                            </div>) :
                                            (<div>
                                                <ol class="breadcrumb">
                                                    <li class="breadcrumb-item"><button className="btn btn-link" onClick={this.backToStart.bind(this)}>Project Pi</button></li>
                                                    <li class="breadcrumb-item"><button className="btn btn-link" onClick={this.selectType.bind(this)} data-type={this.state.type}>{this.state.type}</button></li>
                                                    <li class="breadcrumb-item active"><button className="btn btn-link" disabled>{this.state.topic}</button></li>
                                                </ol>
                                                <h3>Please select a file to download:</h3>
                                            </div>)
                                    )
                                }
                                {this.state.files}
                                <br />
                                <br />
                                <button className="btn btn-secondary" onClick={this.switchView.bind(this)}>Switch to table view</button>
                            </div>
                        ) : (
                                <div className="loading">
                                    <center>
                                        <ReactLoading type={'spin'} color={'#222f3e'} />
                                    </center>
                                </div>
                            )
                    }
                    </div >
                )}
            </div>
        );
    };
}

export default FolderStructure;