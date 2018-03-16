import React from 'react';
import { Carousel, WhiteSpace, WingBlank,Flex } from 'antd-mobile';
import '../home.css'

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);

export default class Category extends React.Component{
	state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <div className="sub-title">Normal</div>
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
		      <PlaceHolder className="inline cat-item" />
		      <PlaceHolder className="inline cat-item" />
		      <PlaceHolder className="inline cat-item" />
		      <PlaceHolder className="inline cat-item" />
		    </Flex>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}