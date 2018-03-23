import React from 'react';
import Header from '../component/detail/header/Header';
import Info from '../component/detail/info/info';
import Footer from '../component/detail/footer/Footer';
import DetailTabs from '../component/detail/tabs/DetailTabs';
// import Comment from '../component/detail/comment/comment';

export default class Detail extends React.Component{
    render(){
        const params=this.props.match.params;
        console.log(this.props.match.params)
        return(
            <div>
                <Header id={params.id}/>
                <Info id={params.id}></Info>
                <DetailTabs id={params.id}/>
                <Footer id={params.id}/>
            </div>
        );
    }
}
