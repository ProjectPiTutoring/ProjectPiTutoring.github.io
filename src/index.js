import React from 'react';
import App from './App';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
import ReactGA from 'react-ga';
import { render } from 'react-snapshot';
import "./scss/Yeti.css";
import "bootstrap/js/dist/collapse";
const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_TOKEN);
const ErrorBoundary = bugsnagClient.use(createPlugin(React));

render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>,
	document.getElementById("root")
);

ReactGA.initialize("UA-45781991-6");
ReactGA.pageview(window.location.pathname + window.location.search);
