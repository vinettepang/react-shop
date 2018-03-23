import React from 'react';
import UserInfo from '../component/user/UserInfo';
import Footer from '../component/common/footer/Footer';
export default class User extends React.Component{
    render(){
  
        return(
            <div>
                <UserInfo/>
                <Footer/>
            </div>
        );
    }
}
