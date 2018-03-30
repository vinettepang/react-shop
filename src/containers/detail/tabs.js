import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';

import { StickyContainer, Sticky } from 'react-sticky';

import Commodity from '../../component/detail/tabs/Commodity';
import TabsNav from '../../component/detail/tabs/TabsNav';

import Evaluate from './evaluate';
import ShopInfo from './shopInfo';
function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}></div>}
  </Sticky>);
}
// const tabs = [
//   { title: '点餐' },
//   { title: '评价' },
//   { title: '商家' },
// ];

const TabExample = (props) => {
  console.log(props)
  return (
  <div className="tabs">
    <ul className="tabs_nav">
      {
        props.tabs.map((item,index)=>{
            <li className={`${item}`} key={index}>{item.title}</li>
        })
      }
    </ul>
    <div className="tabs_body">

    </div>

    <StickyContainer>
      
    </StickyContainer>
  </div>
)
};

export default class DetailTabs extends React.Component{
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
    componentWillMount(){
     // console.log(this.props.data)
    }
    render(){
        const tabs = [
          { title: '点餐',key:0 },
          { title: '评价',key:1  },
          { title: '商家',key:2  },
        ];
        return(
          <TabsNav data={this.props.data} tabs={tabs}>
            <Commodity key={0} data={this.props.data}/>
            <Evaluate key={1} data={this.props.data}/>
            <ShopInfo key={2} data={this.props.data}/>
          </TabsNav>
        );
    }
}
