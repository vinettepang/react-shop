import React from 'react'
import CommodityItem from '../commodity/commodityItem.js'
export default class Commodity extends React.Component{
	constructor(){
		super();
		this.state={
			data:null,
			loading:true
		}
	}
	componentWillMount(){
		fetch(`/shopping/v2/menu?restaurant_id=${this.props.data.id}`)
		.then(response=>{return response.json()})
		.then(json=>{
			this.setState({
				data:json,
				loading:false
			})
		})
		// this.setState({
		// 	data:this.props.data
		// })
	}
	render(){
		//console.log(this.props.data)
		return(
			<div className="overHeight">
				{this.state.loading? '加载中': <CommodityItem data={this.state.data} basicData={this.props.data}/>}
			</div>
		)
	}
}