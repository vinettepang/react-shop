import React from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import { NavBar, Icon,SearchBar } from 'antd-mobile';
export default class Header extends React.Component{
    render(){
          const params=this.props;
        console.log(params)
        return(
            <div>
              <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                  <Icon key="1" type="ellipsis" />,
                ]}
              ><SearchBar style={{width:300}} placeholder="Search" maxLength={8} /></NavBar>
            </div>
        );
    }
}
