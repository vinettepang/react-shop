import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Button } from 'antd-mobile';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro"><Button loading >Start</Button>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

// import React from 'react';
// import {Provider} from 'react-redux';
// import storeConfigure from './store/configStore';

/**
 * 配置redux
 */

// import App from './router/routerMap';

// export default () => (
//   <Provider  store={storeConfigure()}>
//     <App/>
//   </Provider>
// );
