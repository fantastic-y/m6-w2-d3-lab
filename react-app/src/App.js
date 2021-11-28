import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './BookList';
import BookEdit from './BookEdit';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/booklists' exact={true} component={BookList}/>
          <Route path='/booklists/:id' exact={true} component={BookEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
