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
        // console.log(this.props.id)
        fetch('http://localhost:3001/api/detail/info/'+this.props.id,{method:'GET'}).then(response => response.json())
            .then(json => this.setState({info: json}));
    }
    render(){
        const info=this.state.info;
        const dataList=info?
             <DetailInfo info={info} id={this.props.id}/>
            :'加载中...';
        return(
            <div>
                {dataList}
            </div>
        );
    }
}