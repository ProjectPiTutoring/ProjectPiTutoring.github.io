import React, { Component } from 'react';
import { ErrorPage, Loading } from '../Components';
import { Link } from 'react-router-dom';
import { Button, Table, Icon, Input, Label, Container } from 'semantic-ui-react';

const TableRow = ({ item }) => {
    return(
        <Table.Row>
            <Table.Cell>{item.set}</Table.Cell>
            <Table.Cell>{item.type}</Table.Cell>
            <Table.Cell>{item.topic}</Table.Cell>
            <Table.Cell>{item.subTopic}</Table.Cell>
            <Table.Cell>
                <a href={`${process.env.REACT_APP_PROJECT_PI_SERVER}/download/${item.fileCode}`}>
                    <Button icon primary labelPosition='left'>
                        <Icon name='download' />
                        Download {item.type}
                    </Button>
                </a>
            </Table.Cell>
        </Table.Row>
        );
};

class Repository extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            rawFiles: [],
            searchResult: [],
            downloaded: false,
            searchCounter: 0,
            ping: null
        }
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/files`).then(results => { return results.json() }).then(data => {
            let html = data.map((item) => {
                return (<TableRow  key={item._id} item={item} />);
            })
            this.setState({ files: html, rawFiles: data, downloaded: true });
        }).catch((err) => { this.setState({ ping: false, err }) });
    }
    search(event) {
        let searchCounter = 0;
        let text = event.target.value.toLowerCase();
        if (text === "") {
            this.setState({searchResult: []});
            return;
        };
        let map1 = this.state.rawFiles.map(file => {
            if (file.set === undefined) file.set = "";
            if (file.type === undefined) file.type = "";
            if (file.topic === undefined) file.type = "";
            if (file.subTopic === undefined) file.type = "";
            let tags = (file.set + " " + file.type + " " + file.topic + " " + file.subTopic).toLowerCase();
            if(!tags.includes(text)) return false;
            else {
                searchCounter++
                return (<TableRow key={file._id} item={file} />);
            }
        });
        this.setState({searchResult: map1, searchCounter: searchCounter});
    }
    render() {
        return (
            <Container>
                <h3>Our File Repository: 
                    <Label color="teal" horizontal> 
                        {this.state.searchResult[0] != null 
                            ? this.state.searchCounter 
                            : this.state.files.length
                        } Files Found 
                    </Label>
                </h3>
                <Input iconPosition='left' style={{width:'100%'}} placeholder='Search Away' onKeyUp={this.search.bind(this)}>
                    <Icon name='search' />
                    <input />
                </Input>
                {this.state.downloaded ? (
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Set</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Topic</Table.HeaderCell>
                                <Table.HeaderCell>Sub-Topic</Table.HeaderCell>
                                <Table.HeaderCell>Download File</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.searchResult[0] != null ?
                                    (this.state.searchResult) :
                                    (this.state.files)
                            }
                        </Table.Body>
                    </Table>
                ) : (this.state.ping === false ? (<ErrorPage err={this.state.err} />) : (<Loading />))}
                <Link to="/"><Button>Go to Main Menu</Button></Link>
            </Container>
        );
    }
}

export default Repository;