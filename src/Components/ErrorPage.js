import React from 'react';
import bugsnag from 'bugsnag-js';
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);

const ErrorPage = ({ err }) => {
    bugsnagClient.notify(err);
    return (
        <div>
            <h1>An Error Occurred</h1>
            <p>Please try again later. Rest assured, our developers will be notified of this issue.</p>
            <p>If you have any questions or concerns, please do not hesitate to contact our <a href="https://m.me/ProjectPiTutoring">Facebook Page</a>.</p>
        </div>
    );
}

export default ErrorPage;