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

import './home.css'
class Home extends Component{
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
                <Footer/>
            </div>
        );
    }
}
//export default Home
const mapStateToProps =(state)=>{
    console.log(state)
    return{
        userinfo: state.userinfo
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
       
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
