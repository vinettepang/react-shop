import React from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

export default class searchBar extends React.Component{
	constructor(){
		super()
		this.state ={
			support: false,
			css: null,
			height: 0
		}
	}

	componentDidMount(){
		if (CSS.supports("position","sticky") || CSS.supports("position", "-webkit-sticky")) {
			this.setState({
				support:true
			})
		}else{
			let offsetY=this.searchBarDom.offsetTop;
			this._scrollTop = this._scrollTop.bind(this,offsetY);
			//document.addEventListener('srcoll',this._scrollTop);
			this.addEvent(window,'scroll',this._scrollTop);//页面多个window.onscroll共存问题
		}
	}
	componentWillUnmount(){
		document.removeEventListener('scroll',this._scrollTop);
	}
	//页面多个window.onscroll共存问题
	addEvent(obj,type,fn){
	    if(obj.attachEvent){ //ie
	        obj.attachEvent('on'+type,function(){
	            fn.call(obj);
	        })
	    }else{
	        obj.addEventListener(type,fn,false);
	    }
	}
	_scrollTop(offsetY){
		console.log('offsetY')
		let css = null;
		let height = this.searchBarDom.offsetHeight;
		if (window.scrollY > offsetY) {
			css = {
				position: 'fixed',
				top: 0,
				zIndex: 999,
				width:'100%'
			}
		}else{
			css ={
				position: 'static'
			}
		}
		this.setState({
			css,
			height
		})
	}
	render(){
		return (
			<div className='search_bar' style={this.state.support?{position: 'sticky',top: '-1px',zIndex: 999, width: '100%'}:{height:this.state.height===0?null:this.state.height}}>
				<div ref={(div)=>{this.searchBarDom = div}} style={this.state.support? null : this.state.css}>
					<SearchBar placeholder="Search" maxLength={8} />
				</div>
			</div>
	     )
	}
}