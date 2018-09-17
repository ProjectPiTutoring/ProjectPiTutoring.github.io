import React, { Component } from 'react';
import Header from './Components/Header';
import FolderStructure from './pages/FolderStructure';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Repository from './pages/Repository';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="view">
          <Header />
          <Route exact path="/" component={FolderStructure} />
          <Route path="/list" component={Repository} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
