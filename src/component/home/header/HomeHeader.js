import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import GetAddress from '../getAddress/getAddress'
export default class HomeHeader extends React.Component{
	constructor(){
		super();
		this.state={
			temperature:'',
			description:'',
			image_hash:'',
			address:'',
			getAddress:false
		}
	}
	componentWillMount(){
		//console.log(this.props)
		if (this.props.data) {
			let data = this.props.data;
			this.setState(data);
		}
		window.history.pushState({page:'home'},'','');
		this._history=this._history.bind(this);
		window.addEventListener('popstate',this._history)
	}
	//历史页面
	_history(){
		if (!window.history.state) {return;}
		if (window.history.state.page === 'getAddress') {
			this.setState({
				getAddress:true
			})
			this._bodyoverflow()
		}else if(window.history.state.page === 'home'){
			this.setState({
				getAddress:false
			})
			window.document.body.style.overflow = 'auto'
		}
	}
	//
	_bodyoverflow(){
		window.document.body.style.overflow = 'hidden';
		window.document.body.style.height = '100vh';
	}
	//
	_addHistory(){
		window.history.pushState({page:'getAddress'},'','');
		this._addHistory._history = true;
	}
	componentWillUnmount(){
		window.removeEventListener('popstate',this._history)
	}
	onLeftClick(){
	  	this.setState({
	  		getAddress:true
	  	})
	  	this._addHistory()
	  	this._bodyoverflow()
	}
	render(){
		return(
			<ReactCSSTransitionGroup 
			transitionName='example'
			transitionEnterTimeout={500}
			transitionLeaveTimeout={500}>
			    <NavBar
			      mode="dark"
			      leftContent="我的地址"
			      onLeftClick={this.onLeftClick.bind(this)}
			      rightContent={[
			        <span key="0" type="search" style={{ marginRight: '10px' , fontSize:'10px' }}>{this.state.temperature.temperature}</span>,
			        <span key="1" type="search" style={{ marginRight: '10px' , fontSize:'10px' }}>{this.state.temperature.description}</span>,
			        <img key="2" alt="天气图标" className="weather-icon" src="//fuss10.elemecdn.com/9/b9/c8e482821be2080edcffbb3a8d376png.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/"/>,
			      ]}
			    ></NavBar>
			    {this.state.getAddress ? <GetAddress/>: null }
			</ReactCSSTransitionGroup>
		)
	}
}