import React,{Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../component/home/header/HomeHeader';
import Category from '../component/home/category/Category';
import Coupon from '../component/home/coupon/Coupon';
import List from '../component/home/list/List';
import Footer from '../component/common/footer/Footer';
class Home extends Component{
    render(){
        return(
            <div>
                <HomeHeader/>
                <Category/>
                <Coupon/>
                <List/>
                <Footer/>
            </div>
        );
    }
}
//export default Home
function mapStateToProps(state) {
    console.log(state)
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
