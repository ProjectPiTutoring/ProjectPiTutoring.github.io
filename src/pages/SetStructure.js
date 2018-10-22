import React, { Component } from 'react';
import { ErrorPage, Item, Loading, Breadcrumb } from '../Components';
import { Button, Container } from 'semantic-ui-react';

class SetStructure extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            downloaded: false,
            ping: null
        }
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/cat`).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (
                    <Item key={item} to={`/${item}`} outside={false} item={item} />
                );
            })
            this.setState({ files: html, downloaded: true });
        }).catch((err) => { this.setState({ ping: false, err }) });
    }
    render() {
        return (
            <Container>
                {this.state.downloaded ? (
                    <React.Fragment>
                        <Breadcrumb />
                        <h3>Hi there! What are you looking for?</h3>
                        <Button.Group vertical labeled icon fluid>
                            {this.state.files}
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

export default SetStructure;