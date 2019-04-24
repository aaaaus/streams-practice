import React from 'react';

// import './oauth.js'

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

class GoogleAuth extends React.Component {

  state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: googleClientId,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get()  });
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  //function is invoked by listen function on auth.isSignedIn object, updates status without page reload
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

export default GoogleAuth;
