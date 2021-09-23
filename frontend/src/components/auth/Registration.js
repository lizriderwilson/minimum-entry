import React, { Component } from 'react';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      bio: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, password_confirmation, bio } = this.state;

    fetch("http://localhost:3001/api/v1/users", {
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
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          bio: bio
        },
      }),
    })
      .then(response => response.json())
      .then(r => {
        console.log(r)
        if (r.status === 'created') {
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
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
          <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
          <textarea name="bio" placeholder="Bio" value={this.state.bio} onChange={this.handleChange}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Registration