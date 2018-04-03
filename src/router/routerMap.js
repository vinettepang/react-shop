import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import Home from '../containers/home/home';
import Detail from '../containers/detail/detail';
import Buy from '../containers/buy';
import Order from '../containers/order';
import User from '../containers/user';
import {connect} from 'react-redux';

import Footer from '../component/common/footer/Footer';
import Login from '../component/user/login';
import Message from '../containers/message';
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
      <div>
        <Route path='/' exact component={Home}/>
        <Route path='/buy/:id'  component={Buy}/>
        <Route path='/order'  component={Order}/>
        <Route path='/user'  component={User}/>
      <Switch>
        <Route path='/detail/:id'  component={Detail}/>
        <Route path='/login'  component={Login}/>
        <Route path='/message'  component={Message}/>
        <Footer/>
      </Switch>
      </div>
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