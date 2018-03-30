import React from 'react';
import { ListView } from 'antd-mobile';
import {BrowserRouter as Router,Link} from 'react-router-dom';

import ListItem from '../../component/home/list/listItem.js'

export default class GoodsList extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[],
      isLoading: true,
      noMore:false,
      page:0
    };
  }

  componentDidMount() {
    this.isUnmount=false;
    document.addEventListener('scroll', this._getMore.bind(this))
  }

  componentWillMount(){
     let myFetchOptions = {method: 'GET'};
    let page =this.state.page;
    fetch(`http://localhost:8008/api/getGoodsData/${page}`, myFetchOptions)
      .then(response => response.json())
      .then(json => {console.log(json),
      this.setState({
        data:json,
       isLoading:false
      })
    });
  }

  componentWillUnmount(){
    this.isUnmount=true;
    document.removeEventListener('scroll', this._getMore.bind(this))
  }
  flag:false
  _getMore(){
  //  console.log(this.flag)
    if(this.flag){return}
      let srcollTop = null;
      if(document.documentElement.scrollTop && document.documentElement) {
        srcollTop = document.documentElement.scrollTop; //内容距顶部高度
      }else if(document.body){
        srcollTop = document.body.scrollTop; //内容距顶部高度
      }
    //  console.log(window.document.body.offsetHeight - srcollTop)
     //  console.log(window.screen.height + 200)
      if (window.document.body.offsetHeight - srcollTop < window.screen.height + 200) {
          this.flag = true
          if(this.isUnmount){return;}
          let myFetchOptions = {method: 'GET'};
          let page =this.state.page+1;

          fetch(`http://localhost:8008/api/getGoodsData/${page}`, myFetchOptions)
            .then(response => {response.json()})
            .then(json => {
              if (json) {
                console.log(json),this.flag=false
                ,this.setState({
                  data:[...json,...this.state.data],
                   isLoading:false,
                   page:this.state.page+1
                })
              }else{
                console.log('没有数据啦')
              }
          });
      }
  }

  render() {
   // const list = state.isLoading ? '加载中':<ListItem data={state.data}/>
    return (
        <div className="shop_list"> 
          {this.state.isLoading ? '加载中'
          : this.state.data.map((item,index)=>{
            return(
              <ListItem data={item} key={index}/>
            )
          })}
        </div>
     
    );
  }
}
