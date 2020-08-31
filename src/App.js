import React from 'react';
import {BrowserRouter as Router, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {NavBar} from './components/Navbar.js';
import {Header} from './components/Header.js';
import {Footer} from './components/Footer.js';
import {AboutPage} from './pages/AboutPage.js';
import {ProviderPage} from './pages/ProviderPage.js';
import {ProviderTypePage} from './pages/ProviderTypePage.js';

function App() {
  

  return (
    <Router>
    <div className="App">
      <Header />
      <NavBar />
      <div id="page-body">
        <Route path="/" exact>
          <ProviderPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/providertypes">
          <ProviderTypePage />
        </Route>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
