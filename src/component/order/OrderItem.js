import { Card, WhiteSpace } from 'antd-mobile';
import React from 'react';
import PropTypes from 'prop-types'

export default class OrderItem extends React.Component{
	static propTypes = {
	  // item: PropTypes.array,
   //    index: PropTypes.array
	}

	static defaultProps ={
		item:[]
	}

    render(){
  		const item = this.props.item
  		const index = this.props.index
  		console.log(item)
        return(
            <div>
             	<WhiteSpace size="lg" />
				    <Card>
				      <Card.Header
				        title={item.title}
				        thumb={item.img}
				        extra={<span>this is extra</span>}
				      />
				      <Card.Body>
				        <div>{item.title}</div>
				      </Card.Body>
				      <Card.Footer content={`已售`+item.count} extra={`订单号：`+item.id} />
				    </Card>
				    <WhiteSpace size="lg" />
            </div>
        );
    }
}