import React from 'react';

// import './oauth.js'

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: googleClientId,
        scope: 'email'
      })
    });
  }

  render() {
    return (
      <div>GoogleAuth</div>
    )
  }
}

export default GoogleAuth;
