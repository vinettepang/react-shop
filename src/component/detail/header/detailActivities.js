import React from 'react';
import {Link} from 'react-router-dom';

export default class DetailActivities extends React.Component{
    constructor(){
      super()
      this.state = {
        data:null
      }
    }
    componentWillMount(){
      this.setState({
        data:this.props.data
      })
    }
    handleActivity(){
      this.props.handleActivity()
    }
    render(){

        return(
            <div className="activity_cover">
              <div className="activity_cover_content">
              {this.state.data.map((item,index)=>(
                  <p key={index}><span style={{backgroundColor:`${item.icon_color}`}}>{item.icon_name}</span>{item.description}</p>
                ))}
              <span className="activity_cover_close" onClick={this.handleActivity.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" version="1.1"><path fill="#fff" d="M16.552 5.633l-2.044-2.044L2.243 15.854l12.265 12.557 2.044-2.044L6.331 15.854z"/></svg></span>
              </div>
            </div>
        );
    }
}
