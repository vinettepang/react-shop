import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import Commodity from '../../component/detail/tabs/Commodity';

function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '点餐' },
  { title: '评价' },
  { title: '商家' },
];

const TabExample = (data) => (
  <div>
    <WhiteSpace />
    <StickyContainer>
      <Tabs tabs={tabs}
        initalPage={'t2'}
        renderTabBar={renderTabBar}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: '#fff' }}>
          <Commodity {...data}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default class DetailTabs extends React.Component{
    componentWillMount(){
      console.log(this.props.data)
    }
    render(){
          const params=this.props;
       // console.log(params)
        return(
            <div>
                <TabExample data={this.props.data}/>
            </div>
        );
    }
}
