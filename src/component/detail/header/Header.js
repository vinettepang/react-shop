import React from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import DetailActivities from './detailActivities'
import './header.css'

export default class Header extends React.Component{
    constructor(){
      super()
      this.state = {
        data:null,
        activity:false
      }
    }
    componentWillMount(){
      this.setState({
        data:this.props.data,
        image_path:this._formatImg(this.props.data.image_path)
      })
    }
    /*图片格式化*/
    _formatImg(src){
      let png=/png/g.test(src);
      src=`${src}${png?'.png':'.jpeg'}`
      let imgValue=src.split('');
      imgValue.splice(3,0,'/');
      imgValue.splice(1,0,'/');
      return imgValue.join('');
    }
    handleActivities(){
        this.setState({
          activity:!this.state.activity
        })
    }
    goback(){
      console.log(window.history)
      window.history.go(-1)
    }
    render(){

        const data = this.state.data
        //console.log(data)
        return(
            <div className="detail_header">
              <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.goback()}
                rightContent={[
                 
                ]}
              >
              </NavBar>

              <div className="detail_top"> 
                <div className="detail_top_logo">
                  <img src={`//fuss10.elemecdn.com/${this.state.image_path?this.state.image_path:''}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`} alt=""/>
                </div>
                <div className="detail_top_info">
                  <h3>{data.name}</h3>
                  <p className='shop_header_delivery'>
                    <span  className='shop_header_deliveryItem'>
                      {data.delivery_mode.text}/
                    </span>
                    <span className='shop_header_deliveryItem'>
                      {data.order_lead_time}分钟送达/
                    </span>
                    <span className='shop_header_deliveryItem'>
                      {data.piecewise_agent_fee.description}
                    </span>
                  </p>
                  <p>公告{data.promotion_info}</p>
                </div>
              </div>
              <div className="detail_top">
                <p>
                  <i className='activity_cut_icon' style={{backgroundColor:`#${data.activities[1].icon_color}`}}>
                    <span>{data.activities[1].icon_name}</span>
                  </i>
                </p>
                 <p>
                  <i className='activity_cut_icon' onClick={this.handleActivities.bind(this)}>
                    <span>{this.props.data.activities.length}个活动</span>
                  </i>
                </p>
              </div>
              <ReactCSSTransitionGroup 
              transitionName='shoplist_header_cover'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
                {this.state.activity?<DetailActivities data={data.activities} handleActivity={this.handleActivities.bind(this)}/>:null}
              </ReactCSSTransitionGroup>

            </div>
        );
    }
}
