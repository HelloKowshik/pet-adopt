import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Details from './Details';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState('darkblue');
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to='/'>
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path='/' exact>
              <SearchParams />
            </Route>
            <Route path='/details/:id'>
              <Details />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
