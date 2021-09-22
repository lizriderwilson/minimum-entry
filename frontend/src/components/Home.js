import React, {Component} from 'react';
import axios from 'axios';
import Registration from './auth/Registration'
import Login from './auth/Login'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick = () => {
    axios.delete('http://localhost:3001/api/v1/logout', { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error)
      })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <button onClick={this.handleLogoutClick}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}

export default Home