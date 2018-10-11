import React, { Component } from 'react';
import { ErrorPage, Loading, Item, NotFound } from '../Components';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

class TopicStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            notFound: false,
            downloaded: false,
            ping: null
        }
    }
    componentDidMount() {
        let set = this.props.match.params.set;
        let type = this.props.match.params.type;
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/cat/${set}/${type}`).then(res => res.json() ).then(data => {
            if (data.length > 0) {
                let html = data.map((item) => {
                    return (
                        <Item key={item} to={`/${set}/${type}/${item}`} outside={false} icon={faFolder} item={item} />
                    );
                })
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
                                <Link to={"/" + this.props.match.params.set}><button className="btn btn-link">{this.props.match.params.set}</button></Link>
                            </li>
                            <li className="breadcrumb-item active">
                                <button className="btn btn-link" disabled>{this.props.match.params.type}</button>
                            </li>
                        </ol>
                        {this.state.notFound === false && (<h3>For what topic?</h3>)}
                        {this.state.files}
                        <br />
                        <br />
                        <Link to={"/" + this.props.match.params.set}>
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

export default TopicStructure;