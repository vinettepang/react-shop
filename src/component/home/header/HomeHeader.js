import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

export default class HomeHeader extends React.Component{
	render(){
		return(
			<div>
			    <NavBar
			      mode="dark"
			      leftContent="Back"
			      onLeftClick={() => console.log('onLeftClick')}
			      rightContent={[
			        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
			        <Icon key="1" type="ellipsis" />,
			      ]}
			    >NavBar</NavBar>
			</div>
		)
	}
}