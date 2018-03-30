import React from 'react';

export default class HotList extends React.Component{
	constructor(){
		super()
		this.state={
			hotList:[],
			loading: true
		}
	}

	componentWillMount() {
	    if (this.props.hot_list) {
	    	this.setState({
	    		hotList:[...this.props.hot_list]
	    	})
	    }
	}
	
	render(){
		let list = this.state.hotList
		let listData = list.map((item,index)=>{
			return <a className="hot_item" href="/" key={index}>{item.title}</a>
		})
		return(
			<div className="hot_list">
				{ listData }
			</div>
		)
	}
}