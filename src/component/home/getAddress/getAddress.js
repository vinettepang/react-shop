import React from 'react';
import './getAddress.css'

export default class GetAddress extends React.Component{
	constructor(){
		super()
		this.state = {
			rotate:false
		}
	}
	handleBack(){
		console.log(window.history)
		if(this.props.but){
			let reg=new RegExp(this.props.but,'g');
			if( reg.test(document.referrer) ){
				window.location.href='/'
			}else{
				window.history.back()
			}
			return;
		}
		window.history.back()
	}
	handleClick(){
		if(this.handleClick.timer){clearTimeout(this.handleClick.timer)}
		this.setState({rotate:true})
		this.handleClick.timer=setTimeout(()=>{
			this.setState({
				rotate:false
			})
		},1000)
	}
	render(){
		return(
			<div className='getAddress'>
				<header className='use_header'>
					<div className='use_header_bg'>
						<div className='back' onClick={this.handleBack.bind(this)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" version="1.1"><path fill="#fff" d="M16.552 5.633L14.508 3.59 2.243 15.853 14.508 28.41l2.044-2.043-10.22-10.513z"/></svg>
						</div>
						<h1 className='use_header_title'>选择收货地址</h1>
					</div>
				</header>
				<form className="search_address_form">
					<img src='' alt='搜索'/> 
					<input type="search" placeholder="请输入地址" value={this.props.searchData? this.props.searchData : ""} autoFocus="autofocus" className="search_address_form_input"/>
				</form>
				<section className='search_address'>
					<h4>当前地址</h4>
					<div className="address_current">
						<span className='current_address'>地球</span>
						<span className="pos_address" onClick={this.handleClick.bind(this)}>
							<svg className={this.state.rotate?'rotate':'cc'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" version="1.1"><g fillRule="evenodd" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#2395FF"/><path fill="#2395FF" d="M7 0h1v5H7zM7 10h1v5H7zM10 7h5v1h-5zM0 7h5v1H0z"/></g></svg>
							<span>重新定位</span>
						</span>
					</div>
				</section>
			</div>
		)
	}
}