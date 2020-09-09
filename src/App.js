import React, { useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {initialProvQueryParms} from './Provider/ProviderQuery.js';
import {NavBar} from './components/Navbar.js';
import {Header} from './components/Header.js';
import {Footer} from './components/Footer.js';
import {AboutPage} from './pages/AboutPage.js';
import {ProviderPage} from './pages/ProviderPage.js';
import {ProviderTypePage} from './pages/ProviderTypePage.js';


function App() {
  const [provQueryParms, provQueryParmsDispatch] = useState(initialProvQueryParms);
  const [provQueryResults, provQueryResultsDispatch] = useState([]);

  return (
    <Router>
    <div className="App">
      <Header />
      <NavBar />
      <div id="page-body">
          <Route path="/" exact>
            <ProviderPage provQueryParms={provQueryParms} 
                          provQueryParmsDispatch={provQueryParmsDispatch} 
                          provQueryResults={provQueryResults}
                          provQueryResultsDispatch={provQueryResultsDispatch}/>
          </Route>
          <Route path="/providertypes">
            <ProviderTypePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
