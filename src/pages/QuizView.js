import React, { Component } from 'react';
import { Loading, BetaWindow, NotFound, Question } from '../Components';
import { Button, Container, Card, Divider } from 'semantic-ui-react';

class QuizView extends Component {
    constructor() {
        super();
        this.state = {
            quiz: null,
            downloaded: false,
            currentQuestion: null,
            questionCount: null,
            selected: [],
            completed: false,
            results: null,
            correct: 0,
            resultsHTML: null,
            switchBar: null
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`${process.env.REACT_APP_PROJECT_PI_SERVER}/quiz/${id}`).then(results => { return results.json() }).then(quiz => {
            if (quiz !== null) this.setState({quiz, downloaded: true, questionCount: quiz.questions.length, currentQuestion: 0});
            else this.setState({ quiz: false, downloaded: true });
            this.setSwitchBar();
        });
    }
    goBack = () => { 
        this.setState(prevState => {
            if (prevState.currentQuestion > 0) return { currentQuestion: prevState.currentQuestion - 1 }
        }, () => this.setSwitchBar());
    }
    advance = () => { 
        this.setState(prevState => {
            if (prevState.currentQuestion < prevState.questionCount-1) return { currentQuestion: prevState.currentQuestion + 1 }
        }, () => this.setSwitchBar());
    }
    setChoice = (count, state) => {
        let s = this.state.selected;
        s[count] = state;
        this.setState({ selected: s });
        this.setSwitchBar();
    }
    submit = () => {
        this.setState({completed: true});
        let results = this.state.quiz.questions.map((e, l) => {
            let s = this.state.selected[l];
            if (s !== undefined && ((s.c1 === true && e.c1c === true) ||
                (s.c2 === true && e.c2c === true) ||
                (s.c3 === true && e.c3c === true) ||
                (s.c4 === true && e.c4c === true))) {
                this.setState(p => { return { correct: p.correct + 1 }});
                return true;
            } else return false;
        });
        let resultsHTML = results.map((e, l) => {
            if (e === true) {
                let c = null;
                if (this.state.quiz.questions[l].c1c === true) c = this.state.quiz.questions[l].c1;
                if (this.state.quiz.questions[l].c2c === true) c = this.state.quiz.questions[l].c2;
                if (this.state.quiz.questions[l].c3c === true) c = this.state.quiz.questions[l].c3;
                if (this.state.quiz.questions[l].c4c === true) c = this.state.quiz.questions[l].c4;
                return (
                    <Card fluid color="green">
                        <Card.Content>
                            <Card.Header>Question {l+1}</Card.Header>
                            <Card.Description>
                                <h4>{this.state.quiz.questions[l].question}</h4>
                                <p><b>Correct Answer:</b> {c}</p>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
            }
            else {
                let c = null;
                if (this.state.quiz.questions[l].c1c === true) c = this.state.quiz.questions[l].c1;
                if (this.state.quiz.questions[l].c2c === true) c = this.state.quiz.questions[l].c2;
                if (this.state.quiz.questions[l].c3c === true) c = this.state.quiz.questions[l].c3;
                if (this.state.quiz.questions[l].c4c === true) c = this.state.quiz.questions[l].c4;
                if (this.state.selected[l] !== undefined) {
                    let w = null;
                    if (this.state.selected[l].c1 === true) w = this.state.quiz.questions[l].c1;
                    if (this.state.selected[l].c2 === true) w = this.state.quiz.questions[l].c2;
                    if (this.state.selected[l].c3 === true) w = this.state.quiz.questions[l].c3;
                    if (this.state.selected[l].c4 === true) w = this.state.quiz.questions[l].c4;
                    if (w == null) w = "No response";
                    return (
                        <Card fluid color="red">
                            <Card.Content>
                                <Card.Header>Question {l+1}</Card.Header>
                                <Card.Description>
                                    <h4>{this.state.quiz.questions[l].question}</h4>
                                    <p><b>Correct Answer:</b> {c}</p>
                                    <p><b>You Answered:</b> {w}</p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    );
                }
                else {
                    return (
                        <Card fluid color="red">
                            <Card.Content>
                                <Card.Header>Question {l+1}</Card.Header>
                                <Card.Description>
                                    <h4>{this.state.quiz.questions[l].question}</h4>
                                    <p><b>Correct Answer:</b> {c}</p>
                                    <p><b>You Answered:</b> No Response</p>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    );
                }
            }
        });
        this.setState({results, resultsHTML});
    }
    retake = () => {
        this.setState({
            currentQuestion: 0,
            selected: [],
            completed: false,
            results: null,
            correct: 0,
            resultsHTML: null
        }, () => this.setSwitchBar());
    }
    setSwitchBar = () => {
        let a = this.state.quiz.questions.map((e, l) => {
            if (l === this.state.currentQuestion) {
                return (
                    <Button 
                        key={l}
                        onClick={() => this.switchQuestion(l)}
                        active
                        content={`Question ${l+1}`}
                        color="blue"
                    />
                );
            }
            else if (this.state.selected[l] !== undefined && ((this.state.selected[l].c1 === true) || (this.state.selected[l].c2 === true) || (this.state.selected[l].c3 === true) || (this.state.selected[l].c4 === true))) {
                return (
                    <Button 
                        key={l}
                        onClick={() => this.switchQuestion(l)}
                        content={`Question ${l+1}`}
                        color="teal"
                    />
                );
            } 
            else { 
                return (
                    <Button 
                        key={l}
                        onClick={() => this.switchQuestion(l)}
                        content={`Question ${l+1}`}
                    />
                ); 
            }
        });
        this.setState({ switchBar: a });
    }
    switchQuestion = (currentQuestion) => {
        if (this.state.selected[currentQuestion] === undefined) {
            let s = this.state.selected;
            s[currentQuestion] = { c1: false, c2: false, c3: false, c4: false };
            this.setState({ selected: s });
        }
        this.setState({currentQuestion}, () => this.setSwitchBar());
    }
    render() {
        return (
            <Container>
                <BetaWindow />
                {this.state.downloaded ? (
                    this.state.quiz !== false ? (
                        <React.Fragment>
                            {!this.state.completed && (
                                <Button.Group>
                                    {this.state.switchBar}
                                </Button.Group>
                            )}
                            <h1>{this.state.quiz.name}</h1>
                            <h3>{this.state.quiz.topic}</h3>
                            <p>{this.state.quiz.description}</p>
                            <Divider />
                            {this.state.completed ? (
                                this.state.results !== null ? (
                                    <React.Fragment>
                                        <p>You got {this.state.correct} out of {this.state.questionCount} questions correct.</p>
                                        <Divider />
                                        <Container fluid>
                                            <Card.Group>
                                                {this.state.resultsHTML}
                                            </Card.Group>
                                        </Container>
                                        <Button color="orange" labelPosition='left' icon="repeat" onClick={this.retake} content="Retake Quiz" />
                                    </React.Fragment>
                                ) : (<Loading />)
                            ) : (
                                    <Question
                                        count={this.state.currentQuestion + 1}
                                        question={this.state.quiz.questions[this.state.currentQuestion]}
                                        advanceVisible={this.state.currentQuestion < this.state.questionCount - 1}
                                        goBackVisible={this.state.currentQuestion > 0}
                                        setChoice={this.setChoice}
                                        advance={this.advance}
                                        goBack={this.goBack}
                                        state={this.state.selected[this.state.currentQuestion]}
                                        submit={this.submit}
                                    />
                                )}
                        </React.Fragment>
                    ) : (<NotFound />)
                ) : (<Loading />)
                }
            </Container>
        );
    };
}

export default QuizView;