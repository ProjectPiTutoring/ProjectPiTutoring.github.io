import React, { Component } from 'react';
import { Item, ErrorPage, NotFound, Loading } from '../Components';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class TypeStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            ping: null,
            err: null
        }
    }
    componentDidMount() {
        let set = this.props.match.params.set;
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/cat/${set}`).then(res => res.json() ).then(data => {
            if (data.length > 0) {
                let html = data.map((item) => {
                    return (
                        <Item key={item} to={`/${set}/${item}`} outside={false} icon={faFolder} item={item} />
                    );
                });
                this.setState({ files: html, downloaded: true });
            }
            else {
                let html = (<NotFound />);
                this.setState({ files: html, notFound: true, downloaded: true });
            }
        }).catch((err) => { this.setState({ ping: false, err }) });
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
                        {this.state.notFound !== true && (<h3>What kind of file are you looking for?</h3>) }
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
                ) : (this.state.ping === false ? (<ErrorPage err={this.state.err} />) : (<Loading />))}
            </div>
        );
    };
}

export default TypeStructure;