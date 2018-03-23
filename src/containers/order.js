import React from 'react';
import OrderList from '../component/order/Order';
import Footer from '../component/common/footer/Footer';
export default class Order extends React.Component{
    render(){
        return(
            <div>
                <OrderList/>
                <Footer/>
            </div>
        );
    }
}
