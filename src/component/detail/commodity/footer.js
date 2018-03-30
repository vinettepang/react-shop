import React from 'react'
import './footer.css'
export default class Footer extends React.Component{
	constructor(){
		super()
		this.state={
			showList:false
		}
		this._transitionEndCover=this._transitionEndCover.bind(this)
	}
	handleClick(){
		/*如果没有加入购物车的商品就跳过*/
		if(this.props.mainFoods.length===0){return;}
		this.cover.removeAttribute('style');
		this.main.style.opacity=1;
		this.setState({
			showList:!this.state.showList
		})
	}
	componentWillMount(){
		console.log(this.props.allPirce)
		console.log(this.props.data)
		console.log(this.props.num)
	}
	_transitionEndCover(){
		if(!this.state.showList){
			this.cover.style.display='none';
			this.main.style.opacity=0;
		}
	}
	render(){
		return(
			<footer className='shop_footer' >
				<div className="shop_footer_nav">
					<span className={`${this.props.num===0?'isNumNone':''} shopping_footer`} data-quantity={this.props.num} onClick={this.handleClick.bind(this)}></span>
					<div className='shopping_footer_middle'>
						<p className='shop_price'>
							<span>¥{this.props.allPirce}</span>
						</p>
						<p className='kd_price'>{this.props.data.piecewise_agent_fee.tips}</p>
					</div>
					<a href="javascript:void(0)" className={`shoping_submit 
						${this.props.allPirce>=this.props.data.float_minimum_order_amount
						?'':'isdisable'}`}>
						{this.props.allPirce>=this.props.data.float_minimum_order_amount
						?<span>去结算</span>
						:<span>还差¥{this.props.data.float_minimum_order_amount-this.props.allPirce}起送</span>}
					</a>
				</div>
			</footer>
		)
	}
}