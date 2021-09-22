import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    axios.post("http://localhost:3001/api/v1/login", {
      user: {
        username: username,
        password: password
      }
    }, 
      {withCredentials: true}
    ).then(response => {
          console.log(response.data)
        if (response.data.logged_in === 'true') {
          this.props.handleSuccessfulAuth(response.data)
        } // else update state with error and render to page
      }).catch(error => {
        console.log("registration error", error);
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Login