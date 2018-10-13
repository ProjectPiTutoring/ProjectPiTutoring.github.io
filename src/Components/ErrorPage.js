import React from 'react';
import { Offline, Online } from "react-detect-offline";
import bugsnag from 'bugsnag-js';
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);

const ErrorPage = ({ err }) => {
    bugsnagClient.notify(err);
    return (
        <div>
            <Online>
                <h1>An Error Occurred</h1>
                <p>Please try again later. Rest assured, our developers will be notified of this issue.</p>
                <p>If you have any questions or concerns, please do not hesitate to contact our <a href="https://m.me/ProjectPiTutoring">Facebook Page</a>.</p>
            </Online>
            <Offline>
                <h1>Please connect to the internet</h1>
                <p>We are unable to reach our servers as we cannot establish an internet connection from your device.</p>
            </Offline>
        </div>
    );
}

export default ErrorPage;