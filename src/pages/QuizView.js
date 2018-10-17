import React, { Component } from 'react';
import { Loading, BetaWindow, NotFound, Question } from '../Components';

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
                    <div className="card border-success mb-3" key={l}>
                        <div className="card-header">Question {l+1}</div>
                        <div className="card-body">
                            <h4 className="card-title">{this.state.quiz.questions[l].question}</h4>
                            <p className="card-text"><b>Correct Answer:</b> {c}</p>
                        </div>
                    </div>
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
                        <div className="card border-danger mb-3" key={l}>
                            <div className="card-header">Question {l+1}</div>
                            <div className="card-body">
                                <h4 className="card-title">{this.state.quiz.questions[l].question}</h4>
                                <p className="card-text"><b>Correct Answer:</b> {c}</p>
                                <p className="card-text"><b>You Answered:</b> {w}</p>
                            </div>
                        </div>
                    );
                }
                else {
                    return (
                        <div className="card border-danger mb-3" key={l}>
                            <div className="card-header">Question {l+1}</div>
                            <div className="card-body">
                                <h4 className="card-title">{this.state.quiz.questions[l].question}</h4>
                                <p className="card-text"><b>Correct Answer:</b> {c}</p>
                                <p className="card-text"><b>You Answered:</b> No Response</p>
                            </div>
                        </div>
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
                return (<button key={l} onClick={() => this.switchQuestion(l)} type="button" style={{ fontSize: '.9375rem' }} className="btn btn-info">Question {l+1}</button>);
            }
            else if (this.state.selected[l] !== undefined && ((this.state.selected[l].c1 === true) || (this.state.selected[l].c2 === true) || (this.state.selected[l].c3 === true) || (this.state.selected[l].c4 === true))) {
                return (<button key={l} onClick={() => this.switchQuestion(l)} type="button" style={{ fontSize: '.9375rem' }} className="btn btn-primary">Question {l+1}</button>);
            } else { return (<button key={l} onClick={() => this.switchQuestion(l)} type="button" style={{ fontSize: '.9375rem' }} className="btn btn-secondary">Question {l+1}</button>); }
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
            <div className="container">
                <BetaWindow />
                {this.state.downloaded ? (
                    this.state.quiz !== false ? (
                        <div>
                            {!this.state.completed && (
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group mr-2" role="group">
                                        {this.state.switchBar}
                                    </div>
                                </div>
                            )}
                            <h1>{this.state.quiz.name}</h1>
                            <h3>{this.state.quiz.topic}</h3>
                            <p>{this.state.quiz.description}</p>
                            <hr />
                            {this.state.completed ? (
                                this.state.results !== null ? (
                                    <div>
                                        <p>You got {this.state.correct} out of {this.state.questionCount} questions correct.</p>
                                        <hr />
                                        {this.state.resultsHTML}
                                        <button className="btn btn-primary" onClick={this.retake}>Retake Quiz</button>
                                    </div>
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
                        </div>
                    ) : (<NotFound />)
                ) : (<Loading />)
                }
            </div>
        );
    };
}

export default QuizView;