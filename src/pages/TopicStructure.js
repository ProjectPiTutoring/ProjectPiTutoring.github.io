import React, { Component } from 'react';
import { ErrorPage, Loading, Item, NotFound, Breadcrumb } from '../Components';
import { Button, Container } from 'semantic-ui-react';

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
                        <Item key={item} to={`/${set}/${type}/${item}`} outside={false} item={item} />
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
                        <Breadcrumb set={this.props.match.params.set} type={this.props.match.params.type} />
                        {this.state.notFound === false && (<h3>For what topic?</h3>)}
                        <Button.Group vertical labeled icon fluid>
                            {this.state.files}
                            <Button 
                                icon="arrow left"
                                content="Go Back"
                                onClick={() => { this.props.history.push(`/${this.props.match.params.set}`) }}
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

export default TopicStructure;