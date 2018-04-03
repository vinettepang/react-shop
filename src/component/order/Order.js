import {  WingBlank } from 'antd-mobile';
import React from 'react';
import OrderItem from './OrderItem'
export default class Order extends React.Component{
	constructor(props) {
	    super(props);

	    this.state = {
	      dataList:'',
	      isLoading: true,
	    };
	}
	componentDidMount() {
	    let myFetchOptions = {method: 'GET'};
	    fetch('http://localhost:8888/api/orderlist/123', myFetchOptions)
	            .then(response => response.json())
	            .then(json => {
	            	this.setState({
			        dataList: json,
			        isLoading: false,
			      })});
	}
    render(){
    	console.log(this.state.dataList)
    	let dataList = this.state.dataList.length ? this.state.dataList.map((item,index)=>(
    		<OrderItem key={index} item={item}/>)) : '加载中';
        return(
            <div>
                <WingBlank size="lg">
                 {dataList}
                 </WingBlank>
            </div>
        );
    }
}