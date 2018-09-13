import React, { Component } from 'react';
import Header from './Components/Header';
import FolderStructure from './Components/FolderStructure';
// import Footer from './Components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="view">
        <Header />
        <FolderStructure />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
