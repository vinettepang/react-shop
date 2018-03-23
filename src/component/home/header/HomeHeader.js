import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
export default class HomeHeader extends React.Component{
	state = {
    value: '',
  };

  onChange= (value) => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }
	render(){
		return(
			<div>
			    <NavBar
			      mode="dark"
			      leftContent="我的地址"
			      onLeftClick={() => console.log('onLeftClick')}
			      rightContent={[
			        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
			        <Icon key="1" type="ellipsis" />,
			      ]}
			    >React</NavBar>
			    <SearchBar
			        value={this.state.value}
			        placeholder="Search"
			        onSubmit={value => console.log(value, 'onSubmit')}
			        onClear={value => console.log(value, 'onClear')}
			        onFocus={() => console.log('onFocus')}
			        onBlur={() => console.log('onBlur')}
			        onCancel={() => console.log('onCancel')}
			        showCancelButton
			        onChange={this.onChange}
			      />
			</div>
		)
	}
}