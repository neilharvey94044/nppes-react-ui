import React, { useContext, useReducer} from 'react';
import {BrowserRouter as Router, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import {initialProvQueryState} from './Provider/ProviderQuery.js';
import {NavBar} from './components/Navbar.js';
import {Header} from './components/Header.js';
import {Footer} from './components/Footer.js';
import {AboutPage} from './pages/AboutPage.js';
import {ProviderPage} from './pages/ProviderPage.js';
import {ProviderTypePage} from './pages/ProviderTypePage.js';

//Maintains application state regardless of page mounts and unmounts.
//A reducer owns the application state in App.js, a useContext makes the
//reducer available to child components.
const initialAppContext = {provQueryParms: initialProvQueryState, provQueryResults: []};
export const AppContextHandle = React.createContext();
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_QUERY_PARMS':
      return {...state,
              ['provQueryParms']: action.value
            };
    case 'UPDATE_QUERY_RESULTS':
      return {...state,
              ['provQueryResults']: action.value
            };
    default:
      return initialAppContext;
  }
}

function App() {
  const [appState, appDispatch] = useReducer(reducer, initialAppContext);

  return (
    <Router>
    <div className="App">
      <Header />
      <NavBar />
      <div id="page-body">
          <Route path="/" exact>
          <AppContextHandle.Provider value={{appState, appDispatch}} >
            <ProviderPage />
          </AppContextHandle.Provider>
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
