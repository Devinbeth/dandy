import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Home from './components/Home/Home.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={ Login }/>
            <Route path='/home' component={ Home }/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
