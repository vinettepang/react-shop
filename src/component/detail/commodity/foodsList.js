import React from 'react'
import Select from './select'
export default class FoodsList extends React.Component{
	
	shouldComponentUpdate(nextProps,nextStates){
		/*如果选中的数量有值且没变或者食物名称没变就不render*/
		if(this.props.alreadyNum !== nextProps.alreadyNum){
			return true;
		}
		if(this.props.item.name!==nextProps.item.name){
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

	render(){
		let num=0;
		if(this.props.nums){
			num=this.props.nums.num
		}
		return(
			<div className="food_item">
				<span className='food_item_img'>
					<img alt={this.props.item.name} title={this.props.item.name} src={`https://fuss10.elemecdn.com/${this._formatImg(this.props.item.image_path)}?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/`} />
				</span>
				<div className="food_item_info">
					<p>{this.props.item.name}</p>
					<p className='food_item_des'>
						{this.props.item.description}
					</p>
					<p className='food_buy'>
						<span>月售{this.props.item.month_sales}份</span>
						<span>好评率{100*(this.props.item.satisfy_count/this.props.item.rating_count).toFixed(2)}%</span>
					</p>
					<strong className='food_money'>
						<span>{this.props.item.specfoods[0].price}</span>
					</strong>
				</div>
				<Select quantity={this.props.alreadyNum} handleReduceFood={this.props.handleReduceFood} handleReduceAdd={this.props.handleReduceAdd}/>
				
			</div>
		)
	}
}