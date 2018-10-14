import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import ReactGA from 'react-ga';
import "./scss/Yeti.css";
import "bootstrap/js/dist/collapse";
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);
const ErrorBoundary = bugsnagClient.use(createPlugin(React));

ReactDOM.render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>,
	document.getElementById("root")
);
ReactGA.initialize("UA-45781991-6");
ReactGA.pageview(window.location.pathname + window.location.search);
registerServiceWorker();
