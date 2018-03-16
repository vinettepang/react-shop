import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from '../containers/home';
import Detail from '../containers/detail';

import {connect} from 'react-redux';

class App extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      initialDone: false
    }
  }

  componentDidMount(){
    //从localStore中获取到城市名称

    //将数据存入redux
    this.setState({initialDone: true});
  }

  render(){
    //路由的声明.
    let Routes = (
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/detail/:params'  component={Detail}/>
      </Switch>
    );
    return (
      <Router>
        <div>
          {/**
           * 这里可以公共的样式,比如 头部, 尾部, 等.
           */}
          {this.state.initialDone ? Routes : (<div>加载中...</div>)}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({

});

const reduxApp = connect(mapStateToProps,mapDispatchToProps)(App);

export default reduxApp;