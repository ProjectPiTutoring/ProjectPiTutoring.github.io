import React, { Component } from 'react';
import { Header } from "./Components";
import { TypeStructure, TopicStructure, Repository, About, Contact, FileStructure, SetStructure,  } from './pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FacebookProvider, CustomChat } from "react-facebook";
import './Lato.css';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="view">
          <Header />
          <Route exact path="/" component={SetStructure} />
          <Switch>
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
