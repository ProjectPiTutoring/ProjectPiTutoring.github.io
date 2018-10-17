import React from 'react';
import { Link } from 'react-router-dom';

const Quiz = ({ quiz }) => {
    return (
        <div className="card border-primary mb-3">
            <div className="card-header">{quiz.topic}</div>
            <div className="card-body">
                <h4 className="card-title">{quiz.name}</h4>
                <p className="card-text">{quiz.description}</p>
                <p className="card-text">{quiz.questions.length} {quiz.questions.length !== 1 ? "questions" : "question"} </p>
                <Link to={"/quiz/" + quiz._id} className="btn btn-primary">Take Practice Quiz</Link>
            </div>
        </div>
    );
}

export default Quiz;