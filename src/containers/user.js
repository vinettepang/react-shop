import React from 'react';
import Header from '../component/common/header/header.js'
import UserInfo from '../component/user/UserInfo';
export default class User extends React.Component{
    render(){
        return(
            <div>
            	<Header but={'login'} title={'我的'}/>
                <UserInfo/>
            </div>
        );
    }
}
