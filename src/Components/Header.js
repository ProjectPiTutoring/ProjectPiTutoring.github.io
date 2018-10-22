import React, {Component} from 'react';
import Logo from "./logo.png";
import { Menu, Segment, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    render() {
        return(
            <React.Fragment>
                <Segment inverted style={{backgroundColor: '#222f3e',margin:0,borderRadius:0}}>
                    <Container>
                        <img src={Logo} alt="Project Pi Logo" className="logo" />
                        <p style={{fontSize: '20px' }}>Project π combines Mathematics and the accessibility of social media to create a unique learning experience.</p>
                        <p style={{fontSize: '20px' }}>More files will be uploaded daily! Stay tuned.</p>
                    </Container>
                    <Menu inverted pointing secondary style={{padding: '1%', fontSize: '16px',border:'none'}}>
                        <Menu.Item 
                            name='Home' 
                            onClick={() => { this.props.history.push('/') }}
                            active={this.props.history.location.pathname === '/'} 
                        />
                        <Menu.Item
                            name='Quizzes'
                            onClick={() => { this.props.history.push('/quiz') }}
                            active={this.props.history.location.pathname === '/quiz'} 
                        />
                        <Menu.Item
                            name='About'
                            onClick={() => { this.props.history.push('/about') }}
                            active={this.props.history.location.pathname === '/about'} 
                        />
                        <Menu.Item
                            name='Contact Us'
                            onClick={() => { this.props.history.push('/contact') }}
                            active={this.props.history.location.pathname === '/contact'}
                        />
                    </Menu>
                </Segment>
            </React.Fragment>
        );
    }
}

export default withRouter(Header);