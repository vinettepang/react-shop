import React from 'react';
import DetailInfo from './detailInfo';
export default class Info extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            info:false
        }
    }

    componentDidMount(){
    }
    
    render(){
        const info=this.state.info;
        console.log(info)
        const dataList=info?<DetailInfo info={info} id={this.props.id}/>:'加载中...';
        return(
            <div>
               <DetailInfo info={info} id={this.props.id}/>
            </div>
        );
    }
}