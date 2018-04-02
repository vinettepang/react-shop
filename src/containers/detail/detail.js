import React from 'react';
import Header from '../../component/detail/header/Header';
import Info from '../../component/detail/info/info';
import Footer from '../../component/detail/footer/Footer';

import DetailTabs from './tabs';
// import Comment from '../../component/detail/comment/comment';
import './detail.css'
export default class Detail extends React.Component{
    constructor(){
        super();
        this.state={
            data:null,
            loading:true
        }
    }
    componentWillMount(){
        let id=this.props.match.params.id;
        console.log(id)
        fetch(`/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification`)
        .then(response=>{return response.json()})
        .then(json=>{
          this.setState({
            data:json,
            loading:false
          })
        })
    }
    render(){
        return(
            <div className="scrollBox">
                {this.state.loading ? '加载中':
                <div className="scrollMain">
                    <Header data={this.state.data}/>
                    <DetailTabs id={this.props.match.params.id} data={this.state.data}/>
                    <Footer data={this.state.data}/>
                </div>
            }
            </div>
        );
    }
}
