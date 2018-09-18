import React, { Component } from 'react';
import Header from './Components/Header';
import TypeStructure from './pages/TypeStructure';
import TopicStructure from './pages/TopicStructure';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Repository from './pages/Repository';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';
import FileStructure from './pages/FileStructure';
import SetStructure from './pages/SetStructure';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="view">
          <Header />
          <Route exact path="/" component={SetStructure} />
          <Switch>
            <Route path="/list" component={Repository} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/:set/:type/:topic" component={FileStructure} />
            <Route path="/:set/:type" component={TopicStructure} />
            <Route path="/:set" component={TypeStructure} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
