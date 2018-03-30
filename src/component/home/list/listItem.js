import React from 'react';
import { ListView } from 'antd-mobile';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import './listItem.css'

import Active from './active';
export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource:[],
      data:[],
      isLoading: true,
      page:0,
      supportsDom:null,
      img_logo:null, //logo
      is_premium:this.props.data.is_premium ? '<span>品牌</span>':null,
    };
  }

  componentWillMount() {
    const supportsDom = this.props.data.supports.map((val,index)=><li key={index}>{val.icon_name}</li>)
    this.setState({
      data:this.props.data,
      img_logo:this._formatImg(),
      supportsDom:supportsDom,
    })
    //console.log(this.props.data)
  }

  /*图片格式化*/
  _formatImg(){
    let img=this.props.data.image_path
    let png=/png/g.test(img);
    img=`${img}${png?'.png':'.jpeg'}`
    let imgValue=img.split('');
    imgValue.splice(3,0,'/');
    imgValue.splice(1,0,'/');
    return imgValue.join('');
  }
  handleClick(){

  }
  render() {
    const data = this.state.data;
    const brand = `<span>品牌</span>`;
    return (
    <Link to={{pathname: `detail/${data.id}`}}>
      <section className="shop_item">
        <div className="shop_item_logo">
          <img src={`//fuss10.elemecdn.com/${this.state.img_logo}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`} />
        </div>
        <div className="shop_item_info">
          <div className="shop_item_line">
            <h3 className="shop_item_title">
            <span dangerouslySetInnerHTML={{__html: this.state.is_premium}}></span>
            {data.name}
            </h3>
            <ul>{this.state.supportsDom}</ul>
          </div>
          <div className="shop_item_line">
            <div>
              <div className="shop_star" style={{width:`${100*data.rating/5}%`}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 10" width="100%" height="100%"><path fill="#FFCC01"  fillRule="evenodd" d="M54.017 8.072l-2.552 1.561c-.476.291-.758.096-.626-.455l.696-2.909-2.273-1.944c-.424-.362-.325-.691.239-.736l2.982-.237L53.63.589c.213-.515.557-.523.774 0l1.146 2.763 2.982.237c.556.044.67.368.24.736l-2.274 1.944.696 2.91c.13.542-.143.75-.626.454l-2.551-1.56zm-48 0L3.465 9.633c-.476.291-.758.096-.626-.455l.696-2.909-2.273-1.944c-.424-.362-.325-.691.239-.736l2.982-.237L5.63.589c.213-.515.557-.523.774 0L7.55 3.352l2.982.237c.556.044.67.368.24.736L8.497 6.269l.696 2.91c.13.542-.143.75-.626.454l-2.551-1.56zm12 0l-2.552 1.561c-.476.291-.758.096-.626-.455l.696-2.909-2.273-1.944c-.424-.362-.325-.691.239-.736l2.982-.237L17.63.589c.213-.515.557-.523.774 0l1.146 2.763 2.982.237c.556.044.67.368.24.736l-2.274 1.944.696 2.91c.13.542-.143.75-.626.454l-2.551-1.56zm12 0l-2.552 1.561c-.476.291-.758.096-.626-.455l.696-2.909-2.273-1.944c-.424-.362-.325-.691.239-.736l2.982-.237L29.63.589c.213-.515.557-.523.774 0l1.146 2.763 2.982.237c.556.044.67.368.24.736l-2.274 1.944.696 2.91c.13.542-.143.75-.626.454l-2.551-1.56zm12 0l-2.552 1.561c-.476.291-.758.096-.626-.455l.696-2.909-2.273-1.944c-.424-.362-.325-.691.239-.736l2.982-.237L41.63.589c.213-.515.557-.523.774 0l1.146 2.763 2.982.237c.556.044.67.368.24.736l-2.274 1.944.696 2.91c.13.542-.143.75-.626.454l-2.551-1.56z"></path></svg>
              </div>
              <span className="">{data.rating}</span>
            </div>
            <span className="">月售{data.recent_order_num}</span>
          </div>
          <div className="shop_item_line">
            <p>
              <span className="">¥{data.float_minimum_order_amount}起送</span>
              <span className="">配送费¥{data.float_delivery_fee}</span>
            </p>
            <p>
              <span className="">1.13km</span>
              <span className="">{data.order_lead_time}分钟</span>
            </p>
          </div>
          <div className="shop_activities">
            <Active data={data.activities}/>
          </div>
        </div>
      </section>
      </Link>
    )
    
  }
}
