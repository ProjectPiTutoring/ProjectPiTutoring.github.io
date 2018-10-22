import React from 'react';
import { Container, Icon, Header } from 'semantic-ui-react';

const Loading = () => {
    return (
        <Container style={{padding: '5%'}}>
            <Header as='h2' icon textAlign='center'>
                <Icon name='circle notch' loading />
                <Header.Content>Loading...</Header.Content>
            </Header>
        </Container>
    );
}

export default Loading;