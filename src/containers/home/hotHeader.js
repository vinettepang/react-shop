import React from 'react';
import HotList from '../../component/home/hot/hot'

export default class HotHeader extends React.Component{
	constructor(){
		super()
		this.state={
			hotList:[],
			loading: true
		}
	}
	/*父组件的componentDidMount
	并不能触发子组件的渲染,
	所以父组件给子组件传数据
	要componentWillMount传过来*/
	componentWillMount() {
	    fetch('http://localhost:8008/api/homead', {method: 'GET'})
	      .then(response => response.json())
	      .then(json => {
	      	console.log(json)
	      this.setState({
		        hotList:json,
		        loading: false
		    })
	  	});
	}
	
	render(){
		return(
			<div>
				{ this.state.loading ? '加载中':<HotList hot_list={this.state.hotList}/>}
			</div>
		)
	}
}