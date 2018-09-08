import React, { Component } from 'react';
import Header from './Components/Header';
import Repository from './Components/Repository';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="view">
        <Header />
        <Repository />
        <Footer />
      </div>
    );
  }
}

export default App;
