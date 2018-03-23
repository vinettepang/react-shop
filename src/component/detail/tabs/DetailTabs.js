import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import CategoryTabs from './CategoryTabs';

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

const TabExample = () => (
  <div>
    <WhiteSpace />
    <StickyContainer>
      <Tabs tabs={tabs}
        initalPage={'t2'}
        renderTabBar={renderTabBar}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
          <CategoryTabs/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
  </div>
);

export default class detailTabs extends React.Component{
    render(){
          const params=this.props;
        console.log(params)
        return(
            <div>
                <TabExample />
            </div>
        );
    }
}
