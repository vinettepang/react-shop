import React from 'react'
import ShopInformation from '../../component/detail/shopInformation/shopInformation.js'

export default class ShopInfo extends React.Component{
	constructor(){
		super();
		this.state={
			data:{}
		}
	}
	componentDidMount(){
		fetch(`/shopping/restaurant/${this.props.id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification`)
		.then(response=>{return response.json()})
		.then(dataJson=>{
			this.setState({
				data:dataJson
			})
		});
	}
	render(){
		return(
			<ShopInformation dataJson={this.state.data}/>
		)
	}
}