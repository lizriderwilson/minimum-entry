import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home'
import Dashboard from './components/Dashboard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
  }

  checkLoginStatus = () => {
    axios.get('http://localhost:3001/api/v1/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    }).catch(error => {
    console.log("check login error", error)
  })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} render={props => (
              <Home
                { ...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )} />
            <Route exact path={'/dashboard'} render={props => (
              <Dashboard
                { ...props}
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user}
              />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
