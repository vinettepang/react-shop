import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Header from '../../component/home/header/HomeHeader';

export default class HomeHeader extends React.Component{
	constructor(){
		super()
		this.state={
			temperature:'',
			description:'',
			image_hash:'',
			address:'',
			loading: true
		}
	}
	componentDidMount() {
	    fetch('http://localhost:8008/api/home/header', {method: 'GET'})
	      .then(response => response.json())
	      .then(json => {
	      this.setState({
		        temperature:json.weather,
		        address: json.address,
		        loading: false
		    })
	  	});
	}
	render(){
		return(
			<div>
				{ this.state.loading ? '加载中' :<Header data={this.state} />}
			</div>
		)
	}
}