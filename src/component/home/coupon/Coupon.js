import React from 'react';
import { Carousel, WingBlank,Flex } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

export default class Coupon extends React.Component{
	state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
  }
  componentDidMount() {
    // simulate img loading
     let myFetchOptions = {method: 'GET'};
    fetch('http://localhost:3001/api/category' , myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({
        data: json,
      }));
  }
  render() {
    return (
      <WingBlank>
        <div className="sub-title"></div>
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
             <Flex justify="center" className="cat-list"  key={val}>
		      <PlaceHolder className="inline cat-item" />
		    </Flex>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}