import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Home from './containers/home/home';
import configureStore from './store/configStore'
import {Provider} from 'react-redux'

import RouterMap from './router/routerMap'


const store=configureStore();


ReactDOM.render(<Provider store={store}>
    <RouterMap />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

// import React from 'react';
// import {render} from 'react-dom';
// import App from './App';

// render(
//   <App/>,
//   document.getElementById('root')
// );