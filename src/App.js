import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: undefined,
      profileImage: undefined
    };
  }

  componentDidMount() {
    this.fetchUserData()
      .then(this.fetchUserDataSuccess)
  }

  async fetchUserData() {
    const instagramUserEndpoint = `https://api.instagram.com/v1/users/self?access_token=${window.location.hash.substring(1).split('=')[1]}`
    let response = await fetch(instagramUserEndpoint);
    return response.json();
  }

  fetchUserDataSuccess = (userData) => {
    this.setState({userInfo: userData.data, profileImage: userData.data.profile_picture});
  };

  renderUserData() {
    if (this.state.userInfo) {
      return  <Fragment>
        <img src={this.state.profileImage} alt={'User'}/>
        <p>{this.state.userInfo.bio}</p>
      </Fragment>
    } else {
     return <div>Loading...</div>
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.renderUserData()}
        </p>
      </div>
    );
  }
}

export default App;
