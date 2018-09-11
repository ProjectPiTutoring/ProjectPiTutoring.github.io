import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './Repository.css';

class Repository extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            rawFiles: [],
            searchResult: [],
            downloaded: false,
            searchCounter: 0
        }
    }
    componentDidMount() {
        fetch('https://projectpi.phillytan.xyz/files').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                let link = "https://projectpi.phillytan.xyz/download/"+item.fileCode;
                return (
                    <tr key={item._id}>
                        <td>{item.type}</td>
                        <td>{item.topic}</td>
                        <td>{item.subTopic}</td>
                        <td><a href={link}><button className="btn btn-primary">Download File</button></a></td>
                    </tr>
                )
            })
            this.setState({ files: html, rawFiles: data, downloaded: true });
        });
    }
    search(event) {
        let searchCounter = 0;
        let text = event.target.value.toLowerCase();
        if (text === "") {
            this.setState({searchResult: []});
            return;
        };
        let map1 = this.state.rawFiles.map(file => {
            if (file.type === undefined) file.type = "";
            if (file.topic === undefined) file.type = "";
            if (file.subTopic === undefined) file.type = "";
            let tags = (file.type + " " + file.topic + " " + file.subTopic).toLowerCase();
            if(!tags.includes(text)) return false;
            else {
                searchCounter++
                return (
                    <tr key={file._id}>
                        <td>{file.type}</td>
                        <td>{file.topic}</td>
                        <td>{file.subTopic}</td>
                        <td><a href={"https://projectpi.phillytan.xyz/download/" + file.fileCode}><button className="btn btn-primary">Download File</button></a></td>
                    </tr>
                );
            }
        });
        this.setState({searchResult: map1, searchCounter: searchCounter});
        console.log(this.state.searchResult.length);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Our File Repository: <span className="badge badge-primary">
                                {this.state.searchResult[0] != null 
                                    ? this.state.searchCounter 
                                    : this.state.files.length
                                } Files Found
                            </span>
                        </h3>
                        <input type="text" id="searchBar" className="form-control" placeholder="Search Away" onKeyUp={this.search.bind(this)} />
                        {this.state.downloaded ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Topic</th>
                                        <th scope="col">Sub-Topic</th>
                                        <th scope="col">Download File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.searchResult[0] != null ? 
                                        (this.state.searchResult) : 
                                        (this.state.files)
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <div className="loading">
                                <center>
                                    <ReactLoading type={'spin'} color={'#222f3e'} />
                                </center>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Repository;