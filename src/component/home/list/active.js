import React from 'react';
import { ListView } from 'antd-mobile';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import './listItem.css'

export default class Active extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      is_active: true,
      num:0,
      hide:true
    };
  }

  componentWillMount() {
    //console.log(this.props.data)
    if (this.props.data) {
      let num=this.props.data.length;
      this.setState({
        is_active:true,
        num
      })
    }
  }

  handleClick(event){
   event.stopPropagation();
    this.setState({
      hide:!this.state.hide
    })
  }
  render() {
    const activeDom = this.props.data.map((item,index)=>
      <div className="shop_active_item" key={index} style={index > 1 ?this.state.hide?{display:'none'}:{}:null }>
        <i className="active_logo" style={{backgroundColor:`#${item.icon_color}`}}>{item.icon_name}</i>
        <span>{item.description}</span>
      </div>)
    return (
      <div className="shop_active_item">
          {activeDom}
          <div className={`show_more ${this.state.hide?'':'on'} ${this.state.num<=2?'':'active_num'}`} onClick={this.handleClick.bind(this)}>
            <div>{this.state.num}个活动</div>
            <svg className={`${this.state.hide?'':'nowSvg'}`} viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.577 5.423c.79.77 2.073.767 2.857 0l4.12-4.026C12.345.625 12.09 0 10.985 0H1.027C-.077 0-.33.63.457 1.397l4.12 4.026z"></path></svg>
          </div>
      </div>
    
    )
    
  }
}
