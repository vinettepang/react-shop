import React from 'react';
import './scrollTop.css';

export default class ScrollTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opa:true,
      dis:true
    }
    this._move=this._move.bind(this)
  }
  componentDidMount(){
    this.isUnmount=false;
     //document.addEventListener('srcoll',this.resizeTop)
     this.addEvent(window,'scroll',this.resizeTop.bind(this));//页面多个window.onscroll共存问题
    
  }
  componentWillUnmount(){
    this.isUnmount=true;
    document.removeEventListener('srcoll',this.resizeTop)
  }
  _move(){

  }
  //页面多个window.onscroll共存问题
  addEvent(obj,type,fn){
      if(obj.attachEvent){ //ie
          obj.attachEvent('on'+type,function(){
              fn.call(obj);
          })
      }else{
          obj.addEventListener(type,fn,false);
      }
  }
  resizeTop(){
    if (window.scrollY > 500) {
      this.setState({
        dis: false
      })
      setTimeout(()=>{
        if (this.isUnmount) {return;}
          this.setState({
            opa:false
          })
      },100)
    }else{
       this.setState({
        dis: true
      })
      setTimeout(()=>{
        if (this.isUnmount) {return;}
          this.setState({
            opa:true
          })
      },800)
    }
  }
  handleGoBack(){
      document.documentElement.scrollTop = document.body.scrollTop = 0
  }
  render() {
    return (
      <div className='returnTop' onClick={this.handleGoBack.bind(this)} style={{opacity:`${this.state.opa ? 0 : 1}`, display:`${this.state.dis? 'none':''}`}}>
        <svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M32 0h960v156.8H32V0z m960 710.4h-240V1024h-480v-313.6H32L512 236.8l480 473.6z"  fill="#999999"></path></svg>
     </div>
    );
  }
}
