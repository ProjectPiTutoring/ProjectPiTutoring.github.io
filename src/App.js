import React, { Component } from 'react';
import { Header } from "./Components";
import { TypeStructure, TopicStructure, Repository, About, Contact, FileStructure, SetStructure, Quiz, QuizView } from './pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FacebookProvider, CustomChat } from "react-facebook";
import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import './Lato.css';
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {latest: true};
    }
    updateNeeded() {
        unregister()
        this.setState({latest: false})
    }
    componentWillMount() {
        registerServiceWorker(this.updateNeeded.bind(this));
    }
    render() {
        return (
            <Router>
                <div className="view">
                    <SweetAlert
                        show={!this.state.latest}
                        title="Update Available"
                        text="A new update is available for the Project Pi Website. Please reload the page to continue."
                        onConfirm={() => window.location.reload()}
                    />
                    <Header />
                    <Route exact path="/" component={SetStructure} />
                    <Switch>
                        <Route path="/quiz/:id" component={QuizView} />
                        <Route exact path="/quiz" component={Quiz} />
                        <Route exact path="/list" component={Repository} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route path="/:set/:type/:topic" component={FileStructure} />
                        <Route path="/:set/:type" component={TopicStructure} />
                        <Route path="/:set" component={TypeStructure} />
                    </Switch>
                    <FacebookProvider appId="1363704637070550">
                        <CustomChat pageId="1938346206438831" themeColor="#222f3e" />
                    </FacebookProvider>
                </div>
            </Router>
        );
    }
}

export default App;
