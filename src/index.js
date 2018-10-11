import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/dist/yeti/bootstrap.min.css";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import "jquery";
import 'bootstrap/dist/js/bootstrap';
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);
const ErrorBoundary = bugsnagClient.use(createPlugin(React));

ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'));
registerServiceWorker();
