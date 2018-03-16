import React,{Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../component/home/header/HomeHeader';
import Category from '../component/home/category/Category';
//import Coupon from '../component/home/coupon/Coupon';
import List from '../component/home/list/List';
class Home extends Component{
    render(){
        return(
            <div>
                <HomeHeader/>
                <Category/>
                <List/>
            </div>
        );
    }
}
//export default Home
function mapStateToProps(state) {
	return{
		userinfo: state.userinfo
	}
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
