import React, { Component } from 'react';
import { Loading, NotFound, ErrorPage, Item, Breadcrumb } from '../Components';
import { Button, Container } from 'semantic-ui-react';

class FileStructure extends Component {
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
        let topic = this.props.match.params.topic;
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/cat/${set}/${type}/${topic}`).then(results => { return results.json() }).then(data => {
            if (data.length > 0) {
                let html = data.map((item) => {
                    return (
                        <Item key={item._id} to={`${process.env.REACT_APP_PROJECT_PI_SERVER}/download/${item.fileCode}`} outside={true} item={item.subTopic} />
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
            <Container>
                {this.state.downloaded ? (
                    <React.Fragment>
                        <Breadcrumb set={this.props.match.params.set} type={this.props.match.params.type} topic={this.props.match.params.topic} />
                        {this.state.notFound === false && (<h3>Please select a file to download:</h3>)}
                        <Button.Group vertical labeled icon fluid>
                            {this.state.files}
                            <Button 
                                icon="arrow left"
                                content="Go Back"
                                onClick={() => { this.props.history.push(`/${this.props.match.params.set}/${this.props.match.params.type}`) }}
                                style={{textAlign: 'left'}} 
                                color="brown"
                            />
                            <Button 
                                icon="list"
                                content="Show All Files/Search"
                                onClick={() => { this.props.history.push('/list') }}
                                style={{textAlign: 'left'}} 
                            />
                        </Button.Group>
                    </React.Fragment>
                ) : (this.state.ping === false ? (<ErrorPage err={this.state.err} />) : (<Loading />))}
            </Container>
        );
    };
}

export default FileStructure;