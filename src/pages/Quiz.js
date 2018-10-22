import React, { Component } from 'react';
import { Loading, BetaWindow, QuizElement } from '../Components';
import { Container, Card } from 'semantic-ui-react';

class Quiz extends Component {
    constructor() {
        super();
        this.state = { html: null, downloaded: false }
    }
    componentDidMount() {
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/quiz`).then(results => { return results.json() }).then(quizzes => {
            let html = quizzes.map(quiz => { return (<QuizElement key={quiz._id} quiz={quiz} />); });
            this.setState({html, downloaded: true});
        });
    }
    render() {
        return (
            <Container>
                {this.state.downloaded ? (
                    <React.Fragment>
                        <BetaWindow />
                        <h1>Please select a quiz to try:</h1>
                        <Card.Group>
                            { this.state.html }
                        </Card.Group>
                    </React.Fragment>
                ) : (<Loading />)}
            </Container>
        );
    };
}

export default Quiz;