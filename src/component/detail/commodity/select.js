import React from 'react'
import {TheBall} from '../theBall/theBall.js'

export default class Select extends React.Component{
	constructor(){
		super()
		this.state={
			display:false,
			index:0
		}
	}
	componentWillMount(){
		if( this.props.quantity ){
			this.setState({
				index:this.props.quantity
			})
		}
		console.log(this.props.quantity)
	}
	componentWillReceiveProps(nextProps){
		if(  typeof nextProps.quantity==='number' ){
			this.setState({
				index:nextProps.quantity
			})
		}
	}

	/*图片格式化*/
	_formatImg(src){
		let png=/png/g.test(src);
		src=`${src}${png?'.png':'.jpeg'}`
		let imgValue=src.split('');
		imgValue.splice(3,0,'/');
		imgValue.splice(1,0,'/');
		return imgValue.join('');
	}
	handleReduceFood(event){
		if(this.props.handleReduceFood){
			this.props.handleReduceFood(event)
		}
	}
	handleReduceAdd(event){
		TheBall.newBall(event)
		if(this.props.handleReduceAdd){
			this.props.handleReduceAdd(event)
		}
	}
	render(){
		let num=0;
		if(this.props.nums){
			num=this.props.nums.num
		}
		return(
			<div>
				{this.state.index!==0?<span className="food_reduce" onClick={this.handleReduceFood.bind(this)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" version="1.1"><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clipRule="evenodd"></path><path fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clipRule="evenodd"></path></svg>
				</span>:null}
				{this.state.index!==0?<span className="food_add_box_s">{this.state.index}</span>:null}
				<span className="food_add" onClick={this.handleReduceAdd.bind(this)}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" version="1.1"><path fill="none" d="M0 0h44v44H0z"/><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clipRule="evenodd"/></svg>
				</span>
			</div>
		)
	}
}