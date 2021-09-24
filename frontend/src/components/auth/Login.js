import React, { Component } from 'react';

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

    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      mode: "cors",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
      .then(response => response.json())
      .then(r => {
        console.log(r)
        if (r.logged_in === 'true') {
          this.props.handleSuccessfulAuth(r)
        }
      })
      .catch(error => {
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