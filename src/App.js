import React, { Component } from 'react';
import Header from './Components/Header';
import FolderStructure from './Components/FolderStructure';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Footer from './Components/Footer';
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
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
