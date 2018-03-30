import React from 'react'
export default class Category extends React.Component{
	constructor(){
		super();
		this.state={
			display:false,
		}
	}
	shouldComponentUpdate(nextProps,nextStates){
		/*如果num或者current改变了就刷新*/
		/*如果是上一次的选中状态就刷新*/
		if(  (!this.props.nums&&nextProps.nums)||( (nextProps.current===nextProps.index)&&(nextProps.current!==this.props.current) ) || (this.props.current===this.props.index) || (this.props.nums&&(nextProps.nums.num!==this.props.nums.num)) ){
			return true;
		}
		return false;
	}
	/*图片格式化*/
	_formatImg(src){
		let png=/png/g.test(src);
		src=`${src}${png?'.png':'.jpeg'}`
		let imgValue=src.split('');
		imgValue.splice(3,0,'/');
		imgValue.splice(1,0,'/');
		return imgValue.join('');
	}
	handleLeftScroll(){
		if(this.props.handleLeftScroll){
			this.props.handleLeftScroll(this.props.index)
		}
	}
	render(){
		let num=0;
		if(this.props.nums){
			num=this.props.nums.num
		}
		return(
			<li className={`${this.props.current === this.props.index?'active':''}`} onClick={this.handleLeftScroll.bind(this)}>
				{( (this.props.type===1)&&num!==0)?
				<span className="category_tip">
				{num}
				</span>:null}
				{this.props.item.icon_url!==''?
				<img alt={this.props.item.name} src={`//fuss10.elemecdn.com/${this._formatImg(this.props.item.icon_url)}?imageMogr/format/webp/thumbnail/18x/`} />
				:''}
				{this.props.item.name}
			</li>
		)
	}
}