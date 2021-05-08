import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import { history } from '../utility/history';
import Home from './Home';
import PlayPage from './Play';
import GamePage from './Game';
import RankingPage from './Ranking';
import NotFoundPage from './NotFound';
import "./App.css";

function App() {

  return (
    <Router history={history}>
      
      <div className="base">
        <div className="header">
          <h1>Ferrocarril</h1>
        </div>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/play" component={PlayPage} />
            <Route path="/game" component={GamePage} />
            <Route path="/ranking" component={RankingPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
