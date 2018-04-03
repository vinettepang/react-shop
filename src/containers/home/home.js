import React,{Component} from 'react';
import { connect } from 'react-redux';

import HomeHeader from './homeHeader';
import HotHeader from './hotHeader';
import GoodsList from './goodsList';

import SearchBar from '../../component/home/searchBar/searchBar';
import Category from '../../component/home/category/Category';
import Coupon from '../../component/home/coupon/Coupon';
import Footer from '../../component/common/footer/Footer';
import ScrollTop from '../../component/common/scrollTop/scrollTop';

import { login } from '../../reducer/dataState.js'
import './home.css'
class Home extends Component{
    /*保存登录状态*/
    componentWillMount(){
        let localstate=this._getLocal('islogin');
        if(localstate){
            this.props.onLogin(localstate)
            console.log(localstate)
        }
        console.log(this.props.data2)
    }
    _getLocal(name){
        return JSON.parse(localStorage.getItem(name))
    }
        
    render(){
        return(
            <div>
                <HomeHeader/>
                <SearchBar/>
                <HotHeader/>
                <Category/>
                <Coupon/>
                <GoodsList/>
                <ScrollTop/>
            </div>
        );
    }
}
//export default Home
const mapStateToProps =(state)=>{
    console.log(state)
    return{
        data:state.loginPart,
        data2:state
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onLogin:(data)=>{
            dispatch(login(data))
        }
    }
}
// function mapStateToProps(state) {
//     console.log(state)
// 	return{
// 		userinfo: state.userinfo
// 	}
// }

// function mapDispatchToProps(dispatch) {
//     return {
//     }
// }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
