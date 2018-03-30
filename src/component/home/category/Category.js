import React from 'react';
import PropTypes from 'prop-types';
import { Carousel, WingBlank,Flex } from 'antd-mobile';

const PlaceHolder = ({ className = '', ...restProps }) => (
  
  <div className={`${className} placeholder`} {...restProps}>
    
    <img src={`//fuss10.elemecdn.com/${restProps.itemimg}.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`} />
    {restProps.itemtitle}
  </div>
);

export default class Category extends React.Component{
  static propTypes = {
    data: PropTypes.array
  }
  constructor(){
    super();
    this.state = {
      data: [],
      group:[],
      imgHeight: 176,
      slideIndex: 0,
      groupNum:10
    }
  }
	
  componentDidMount() {
     let myFetchOptions = {method: 'GET'};
    fetch('http://localhost:8008/api/category' , myFetchOptions)
            .then(response => response.json())
            .then(json => {this.setState({
        data: json[0].entries,
      }),this.getGroupData()});
  }

  getGroupData(){
    const carouselData = this.state.data
    const groupData = []
    for( var i=0, len=carouselData.length; i<len; i+=this.state.groupNum ){
      groupData.push(carouselData.slice(i,i+this.state.groupNum))
    }
    //console.log(groupData)
    this.setState({
        group: groupData
    })
  }

  render() {
    return (
      <WingBlank>
        <Carousel
          className='category-list'
          autoplay={false}
          infinite
          selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.group.map((items,index) => {
            
           return (
             <Flex justify="center" className="cat-list"  key={index}>
              {items.map((item,i)=>{
            let imgValue=item.image_hash.split('');
            imgValue.splice(3,0,'/');
            imgValue.splice(1,0,'/');
            imgValue=imgValue.join('');
                return(
                <PlaceHolder className="inline cat-item" itemtitle={item.name} itemimg={imgValue}  key={i}/>
              )}
              )}
            </Flex>
          )
          })}
        </Carousel>
      </WingBlank>
    );
  }
}