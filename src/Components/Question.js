import React, { Component } from 'react';
import { Choice } from '../Components';

class Question extends Component {
    constructor(props) { super(props); this.state = { c1: false, c2: false, c3: false, c4: false } }
    componentWillReceiveProps(props) { if (props.state !== undefined) { this.setState(props.state); } }
    onSelect = (cid) => {
        let newState = { c1: false, c2: false, c3: false, c4: false, ["c" + cid]: (this.state["c" + cid] !== true) };
        this.setState(newState); 
        this.props.setChoice(this.props.count - 1, newState);        
    }
    advance() { this.setState({ c1: false, c2: false, c3: false, c4: false }); this.props.advance(); }
    goBack() { this.setState({ c1: false, c2: false, c3: false, c4: false }); this.props.goBack(); }
    render() {
        return (
            <div>
                <h3>Question {this.props.count}:</h3>
                <h5>{this.props.question.question}</h5>
                {this.props.question.qi && (<img style={{ width: '100%', height: 'auto', marginTop: '2%', marginBottom: '2%' }} alt={this.props.question.question} src={process.env.REACT_APP_PROJECT_PI_SERVER+this.props.question.qi} />)}
                <div className="row">
                    <Choice selected={this.state.c1} question={this.props.question.c1} image={this.props.question.c1i} select="1" onSelect={this.onSelect} />
                    <Choice selected={this.state.c2} question={this.props.question.c2} image={this.props.question.c2i} select="2" onSelect={this.onSelect} />
                    <Choice selected={this.state.c3} question={this.props.question.c3} image={this.props.question.c3i} select="3" onSelect={this.onSelect} />
                    <Choice selected={this.state.c4} question={this.props.question.c4} image={this.props.question.c4i} select="4" onSelect={this.onSelect} />
                </div>
                {this.props.goBackVisible && (<button className="btn btn-primary" onClick={this.goBack.bind(this)}>Go back to previous question</button>)}
                {this.props.advanceVisible ? 
                    (<button className="btn btn-primary float-right" onClick={this.advance.bind(this)}>Go to next question</button>) : 
                    (<button className="btn btn-primary float-right" onClick={this.props.submit}>Submit Quiz</button>)
                }
            </div>
        )
    }
}

export default Question;