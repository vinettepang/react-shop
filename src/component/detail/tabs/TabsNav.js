import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';


export default class TabsNav extends React.Component{
    constructor(){
      super()
      this.state={
        current:0
      }
    }
    handClick(index){
      this.setState({
        current:index
      })
    }
    render(){
       //    const params=this.props;
       // console.log(params)
        return(
            <div className="tabs">
              <ul className="tabs_nav">
                {
                  this.props.tabs.map((item,index)=>
                      <li onClick={this.handClick.bind(this,index)} className={`${item.key === this.state.current ? 'nav_active':''}`} key={index}>{item.title}</li>
                  )
                }
              </ul>
              <div className="tabs_body">
              {React.Children.map(this.props.children,(child)=>{
                return(
                 <div className="tabs_panel" style={{display:`${Number(child.key)===Number(this.state.current)?'block ':'none'}`}}>
                  {child}
                </div>
                )
              })}
               
              </div>

              <StickyContainer>
                
              </StickyContainer>
            </div>
        );
    }
}
