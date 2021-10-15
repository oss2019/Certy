import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import './App.css';
import Header from "./components/Header/index"

function App() {
  return (
    <div className="App">
        <Router>
        <Header/>
            <Routes/>
        </Router>
    </div>
  );
}

export default App;
