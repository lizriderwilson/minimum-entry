import React from 'react';

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{props.loggedInStatus}</h2>
      <h3>{props.user.username}</h3>
    </div>
  )
}

export default Dashboard;