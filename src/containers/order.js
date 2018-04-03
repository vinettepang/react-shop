import React from 'react';
import OrderList from '../component/order/Order';
export default class Order extends React.Component{
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
        return(
            <div>
                <OrderList/>
            </div>
        );
    }
}
