import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login.js';
import Header from './components/Header/Header.js';
import About from './components/About/About.js';
import Donate from './components/Donate/Donate.js';
import Account from './components/Account/Account.js';
import Home from './components/Home/Home.js';
import Character from './components/Character/Character.js';
import AllWeapons from './components/AllWeapons/AllWeapons.js';
import AllArmor from './components/AllArmor/AllArmor.js';
import AllSpells from './components/AllSpells/AllSpells.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/about' component={About} />
              <Route path='/donate' component={Donate} />
              <Route path='/account' component={Account} />
              <Route path='/home' component={Home} />
              <Route path='/character/:id' component={Character} />
              <Route path='/weapons' component={AllWeapons} />
              <Route path='/armor' component={AllArmor} />
              <Route path='/spells' component={AllSpells} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
