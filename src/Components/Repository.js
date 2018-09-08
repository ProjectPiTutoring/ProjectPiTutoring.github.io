import React, { Component } from 'react';

class Repository extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
        }
    }
    componentDidMount() {
        fetch('http://projectpi.phillytan.xyz/files').then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                let link = "http://projectpi.phillytan.xyz/download/"+item.fileCode;
                return (
                <tr>
                    <td>{item.type}</td>
                    <td>{item.topic}</td>
                    <td>{item.subTopic}</td>
                    <td><a href={link}><button className="btn btn-primary">Download File</button></a></td>
                </tr>
                )
            })
            this.setState({ files: html });
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Our File Repository:</h3>
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
                                {this.state.files}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Repository;