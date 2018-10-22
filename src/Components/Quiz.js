import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';

const Quiz = withRouter(({ quiz, history }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{quiz.name}</Card.Header>
                <Card.Meta>{quiz.topic}</Card.Meta>
                <Card.Description>{quiz.description}</Card.Description>
                <Icon name='unordered list' /> {quiz.questions.length} {quiz.questions.length !== 1 ? "questions" : "question"}
            </Card.Content>
            <Card.Content extra>
                <Button basic color='blue' fluid onClick={() => { history.push(`/quiz/${quiz._id}`) }}>
                    Take Practice Quiz
                </Button>
            </Card.Content>
        </Card>
    );
});

export default Quiz;