import React, { Component } from 'react';
import { Item, ErrorPage, NotFound, Loading, Breadcrumb } from '../Components';
import { Button, Container } from 'semantic-ui-react';

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
                        <Item key={item} to={`/${set}/${item}`} outside={false} item={item} />
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
            <Container>
                {this.state.downloaded ? (
                    <React.Fragment>
                        <Breadcrumb set={this.props.match.params.set} />
                        {this.state.notFound !== true && (<h3>What kind of file are you looking for?</h3>) }
                        <Button.Group vertical labeled icon fluid>
                            {this.state.files}
                            <Button 
                                icon="arrow left"
                                content="Go Back"
                                onClick={() => { this.props.history.push('/') }}
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

export default TypeStructure;