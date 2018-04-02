import React from 'react'

import './commodityItem.css'
import Category from './category'
import FoodsList from './foodsList'
import Footer from './footer'
export default class CommodityItem extends React.Component{
	constructor(){
		super();
		this.state={
			data:null,
			scroll:0,
			num:0,
			allPrice:0,
			id:0,
			fatherCate:{},
			foodsSave:{},
			quantity:null
		}
	}
	componentDidMount(){
		//console.log('componentDidMount')
		this.setState({
			data:this.props.data
		})
		//顶部高度
		let headerH = document.querySelector('.detail_header').offsetHeight
		//tabs高度
		for (let i = 0; i < document.querySelectorAll('.tabs_panel').length ; i++) {
			document.querySelectorAll('.tabs_panel')[i].style.height = document.body.clientHeight - document.querySelector('.shoplist').offsetTop + headerH + 'px'
		}
		this._scrollTogether=this._scrollTogether.bind(this);
		this._getHandleClient=this._getHandleClient.bind(this);
		this.main.addEventListener('scroll',this._scrollTogether);
		this.main.addEventListener('scroll',this._getHandleClient);
		//this._computListHeight();

	}
	isFirst = true
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
		
		if (!this.isFirst) {return}
		let id = this.props.basicData.id?this.props.basicData.id:0;
		let allSelected=this._getLocalStorage();
		if (allSelected && allSelected[id]) {
			allSelected[id].entities.forEach(()=>{

			})
		
		}else{
			this.setState({
				id:id
			})
		}
	}
	componentWillUnmount(){
		this.main.removeEventListener('scroll',this._scrollTogether)
		this.main.removeEventListener('touchstart',this._getHandleClient)
	}
	//组件更新结束之后执行，在初始化render时不执行
	componentDidUpdate(){
		//console.log('componentDidUpdate')
		this._computListHeight();
	}
	isFirst=true
	currentScroll=0
	currentMainScroll=0
	_scrollTogether(){
		//顶部高度
		let headerH = document.querySelector('.detail_header').offsetHeight
		let scrollMain = document.querySelector('.scrollMain').scrollTop
		if (headerH !== scrollMain) {	
			document.querySelector('.scrollMain').scrollTop = this.currentMainScroll + (this.main.scrollTop-this.currentScroll)
			//console.log(document.querySelector('.scrollMain').scrollTop)
		}
		/*tab和列表联动,控制tab*/
		if(!this.isScroll){return;}
		this._posCalc(this.listHeight,this.main.scrollTop)
	}
	_getHandleClient(){
		//右侧
		this.currentScroll=this.main.scrollTop;
		//全屏
		this.currentMainScroll=document.querySelector('.scrollMain').scrollTop;
	}
	/*计算当前分类*/
	_posCalc(pos,y){
		let prevArr = pos.slice(0,parseInt(pos.length/2,10))
		let nextArr = pos.slice(parseInt(pos.length/2,10))
		let prevIndex = prevArr[prevArr.length - 1]
		let nextIndex = nextArr[0]
		if (typeof(prevIndex) == 'undefined' || typeof(nextIndex) == 'undefined') {return}
		if (prevIndex.pos > Math.abs(y)) {
			this._posCalc(prevArr,y);
			return
		}else if(nextIndex.pos < Math.abs(y)){
			this._posCalc(nextArr,y);
			return
		}else if(prevIndex.pos <= Math.abs(y) && nextIndex.pos > Math.abs(y)){
			if (prevIndex.index === this.state.current) {return}
			this.setState({
				current: prevIndex.index
			})
		console.log(prevIndex.index)
			return
		}
	}
	//计算右侧每一类对应的高度
	listHeight=[]
	isScroll=true
	_computListHeight(){
		//console.log('_computListHeight')
		let listDom = this.listHeightDom
		//console.log(this.listHeightDom)
		//console.log(listDom.getElementsByTagName('h3').length)
		if (listDom.getElementsByTagName('h3').length !== 0) {
			for (var i = 0; i < listDom.getElementsByTagName('h3').length; i++) {
				//console.log(listDom.getElementsByTagName('h3')[i].offsetTop)
				this.listHeight.push({
					index:i,
					pos:listDom.getElementsByTagName('h3')[i].offsetTop
				})
			}
		}
	}
	//点击跳转
	handleLeftScroll(id){
		this.isScroll = false;
		this._animate(this.main, this.main.scrollTop, this.listHeight[id].pos)
		this._run(id)
	}
	/*滚动动画*/
	// 当前值
	// 目标值
	_isAnimate=null
	_animate(obj,now,target){
		this.isScroll = false
		window.cancelAnimationFrame(this._isAnimate)
		//ceil向上舍入 Math.floor()执行向下舍入 Math.round()四舍五入
		obj.scrollTop = Math.ceil(now + (target - now) /4)
		if (obj.scrollHeight - obj.scrollTop <= obj.offsetHeight +4) {
			obj.scrollTop = (obj.scrollHeight - obj.offsetHeight)
			/*定时器是因为这个最后的滚动还没有完成就会触发滚动事件*/
			let timer = setTimeout(()=>{
				this.isScroll = true;
				clearTimeout(timer)
			},50);
			return;
		}else if(Math.abs(obj.scrollTop - target) <= 4){
			obj.scrollTop = target;
			let timer = setTimeout(()=>{
				this.isScroll = true
				clearTimeout(timer)
			},50);
			return;
		}else{
			this._isAnimate = requestAnimationFrame(()=>{
				this._animate(this.main,obj.scrollTop,target)
			})
			//
		}
	}
	/*点击控制*/
	_run(id){
		this.setState({
			current:id
		})
	}

	handleReduceFood(index,i,cId,itemId,event){
		this.isFirst = false;
		let categoryCount = 0;
		let allCount = 0;
		let allPrice = 0;
		let id = this.state.id;
		let obj ={};
		let thisData = this.props.data[index].foods[i];
		let alreadySelect = this.state.foodsSave

		let selectNum = 0;
		let adjArr = [];
		//没有选择过返回
		if(!alreadySelect){return}
		alreadySelect[id].entities.forEach((value,index)=>{
			/*选择的是同一个*/
			if (value.item_id === thisData.item_id) {
				selectNum = --value.quantity
				if (selectNum <= 0) {
					adjArr=[
					...alreadySelect[id].entities.slice(index+1),
					...alreadySelect[id].entities.slice(0,index)
					]
					alreadySelect[id].entities = adjArr
					value.view_discount_price = 0
				}else{
					value.quantity = selectNum
					value.view_discount_price = thisData.specfoods[0].price*selectNum
					value.view_original_price = thisData.specfoods[0].price*selectNum
				}
			}
			allCount += (value.quantity)*10000
			allPrice += (value.view_discount_price)*10000

			if (value.id === cId) {
				categoryCount = categoryCount+ value.quantity
			}
		})
		
		this._saveLocalStorage(alreadySelect)
		
		let categoryObj = {}
		categoryObj[cId] ={
			id: cId,
			num:categoryCount
		}

		//fatherCate表示商品每一个类别选中食物总量
		this.setState({
			num: allCount/10000,
			allPrice: allPrice/10000,
			foodsSave: alreadySelect,
			fatherCate:{
				...this.state.fatherCate,
				...categoryObj
			}
		})
	}
	handleReduceAdd(index,i,cId,itemId,event){
		this.isFirst = false;
		let categoryCount = 0;
		let allCount = 0;
		let allPrice = 0;
		let id = this.state.id;
		let obj ={};
		let thisData = this.props.data[index].foods[i];
		let alreadySelect = this.state.foodsSave

		let selectNum = 1;
		let footSame = false;
		console.log(alreadySelect)
		if (alreadySelect && alreadySelect[id]) {
			alreadySelect[id].entities.forEach((value,index)=>{
				/*选择的是同一个*/
				if (value.item_id === thisData.item_id) {
					footSame = true
					selectNum = ++value.quantity
					value.quantity = selectNum
					value.view_discount_price = thisData.specfoods[0].price*selectNum
					value.view_original_price=thisData.specfoods[0].price*selectNum;
					obj=alreadySelect;
				}
				console.log(obj)
			})
			if (!footSame) {
				/*不为同一个*/
				alreadySelect[id].entities.push({
					"id":thisData.category_id,
					"id": thisData.category_id,
					"sku_id": thisData.specfoods[0].sku_id,
					"item_id": thisData.item_id,
					"quantity": selectNum,
					"name": thisData.specfoods[0].name,
					"price": thisData.specfoods[0].price,
					"original_price": null,
					"packing_fee": 1,
					"stock": thisData.specfoods[0].stock,
					"specs": thisData.specfoods[0].specs,
					"attrs": thisData.attrs,
					"weight": thisData.specfoods[0].weight,
					"extra": {},
					"view_discount_price": thisData.specfoods[0].price*selectNum,
					"view_original_price": thisData.specfoods[0].price*selectNum
				})
				obj = alreadySelect
				console.log(obj)
			}
		}else{
			//没储存过
			obj[id] ={
				"entities":[{
					"id": thisData.category_id,
					"quantity":selectNum,
					"sku_id": thisData.specfoods[0].sku_id,
					"item_id": thisData.item_id,
					"name": thisData.specfoods[0].name,
		    	    "price": thisData.specfoods[0].price,
		    	    "original_price": null,
		    	    "packing_fee": 1,
		    	    "stock": thisData.specfoods[0].stock,
		    	    "specs": thisData.specfoods[0].specs,
		    	    "attrs": thisData.attrs,
		    	    "weight": thisData.specfoods[0].weight,
		    	    "extra": {},
		    	    "view_discount_price": thisData.specfoods[0].price*selectNum,
		    	    "view_original_price": thisData.specfoods[0].price*selectNum
				}]
			}
			console.log(obj)
		}

		obj[id].entities.forEach((value,index)=>{
			allCount+=(value.quantity)*10000
			allPrice+=(value.view_discount_price)*10000
			if (value.id === cId) {
				categoryCount = categoryCount+value.quantity
			}
		})
		//没储存过该商家
		if (alreadySelect && !alreadySelect[id]) {
			obj ={
				...alreadySelect,
				...obj
			}
		}
		console.log(obj)
		this._saveLocalStorage(obj)
		let categoryObj = {}
		categoryObj[cId] ={
			id: cId,
			num:categoryCount
		}

		//fatherCate表示商品每一个类别选中食物总量
		this.setState({
			num: allCount/10000,
			allPrice: allPrice/10000,
			foodsSave: obj,
			fatherCate:{
				...this.state.fatherCate,
				...categoryObj
			}
		})
	}
	
	handleFooterAdd(index,lieBid){
		console.log(index,lieBid)
		let thisFoods=this.state.foodsSave;
		let num=0;
		let allPirce=0;
		thisFoods[this.state.id].entities[index].quantity++;
		/*计算选中商品总个数和总价*/
		thisFoods[this.state.id].entities.forEach((value,index)=>{
			num=num+value.quantity;
			allPirce=allPirce+(value.quantity*value.price)
		})
		let categoryObj={};
		categoryObj[lieBid]={
			id:lieBid,
			num:this.state.fatherCate[lieBid].num+1
		}
		this.setState({
			allPirce:allPirce,
			num:num,
			foodsSave:thisFoods,
			/*类别数量控制*/
			fatherCate:{
				...this.state.fatherCate,
				...categoryObj
			}
		})
		console.log(thisFoods)
		this._saveLocalStorage(thisFoods);
	}
	handleFooterReduce(index,lieBid){
		console.log(index,lieBid)
		let thisFoods=this.state.foodsSave;
		let thisFoodsArr=[];
		let num=0;
		let allPirce=0;
		/*当前类别计数*/
		if(thisFoods[this.state.id].entities[index].quantity-1===0){
			thisFoodsArr=[
				...thisFoods[this.state.id].entities.slice(0,index),
				...thisFoods[this.state.id].entities.slice(index+1)
			]
			thisFoods[this.state.id].entities=thisFoodsArr;
		}else{
			thisFoods[this.state.id].entities[index].quantity--;
		}
		/*计算选中商品总个数和总价*/
		thisFoods[this.state.id].entities.forEach((value,index)=>{
			num=num+value.quantity;
			allPirce=allPirce+(value.quantity*value.price)
		})
		let categoryObj={};
		categoryObj[lieBid]={
			id:lieBid,
			num:this.state.fatherCate[lieBid].num-1
		}
		this.setState({
			allPirce:allPirce,
			num:num,
			/*所有购物车的商品集合*/
			foodsSave:thisFoods,
			/*按类别的id、num对的集合*/
			fatherCate:{
				...this.state.fatherCate,
				...categoryObj
			}
		})
		this._saveLocalStorage(thisFoods);
	}
	/*清空购物车*/
	emptyAllFoods(){
		let thisShopping={};
		/*清空主内容和购物车*/
		thisShopping[this.state.id]=[{entities:[]}];
		/*清空类别，左侧aside*/
		let fatherCate={...this.state.fatherCate}
		/*fatherCate[value].num=0;循环里不这么做的原因是在category组件里我设置了传进去的值变化才更新，这里是对象，所以要新建一个对象*/
		for(let  value in fatherCate){
			fatherCate[value]={
				...fatherCate[value],
				num:0
			}
		}
		this.setState({
			allPirce:0,
			num:0,
			foodsSave:{
				...this.state.foodsSave,
				...thisShopping
			},
			/*类别*/
			fatherCate:fatherCate
		})
		/*存商家的购物车信息*/
		this._saveLocalStorage({
				...this.state.foodsSave,
				...thisShopping
		});
	}
	_filter(para,arr){
		return arr.filter((item,index)=>{
			return para===item.item_id
		})
	}
	_saveLocalStorage(obj){
		try{
			localStorage.setItem("currentSelected",JSON.stringify(obj))
		}catch(e){
			console.log(e)
		}
	}
	_getLocalStorage(){
		try{
			return JSON.parse(localStorage.getItem("currentSelected"))
		}catch(e){
			console.log(e)
		}
	}
	render(){
		//console.log(this.props.data)
		let id=this.state.id;
		let allSelected=this.state.foodsSave;
		let isSave=null;
		/*如果商家的商品的选中信息存在*/
		if(allSelected && allSelected[id]){
			/*选中的商品*/
			isSave=allSelected;
		}
		let data = this.props.data?this.props.data:[]
		const categoryContext = data.map((item,index)=>{
			return(
				<Category item={item} index={index}
				key={index} type={item.type}
				nums={this.state.fatherCate[item.id]}
				current={this.state.current}
				handleLeftScroll={this.handleLeftScroll.bind(this)} />
			)
		})
		 // <li data={index} key={index} onClick={this.handleLeftScroll.bind(this,index)}>{item.name}</li>
		const goodsListContext = data.map((items,index)=>{
			//console.log(items)
			let goodContext = items.foods.map((item,i)=>{
				return(
					<FoodsList
						key={i}
						item={item}
						alreadyNum={isSave?
						(this._filter(item.item_id,isSave[id].entities).length===0
						?0
						:this._filter(item.item_id,isSave[id].entities)[0].quantity)
						:0}  
						handleReduceFood={this.handleReduceFood.bind(this,index,i,item.category_id,item.item_id)}
						handleReduceAdd={this.handleReduceAdd.bind(this,index,i,item.category_id,item.item_id)}
					/>
				)
				// <div key={i} className="food_item">
				// 		{item.name}
				// 		<span className="food_reduce" onClick={this.handleReduceFood.bind(this,index,i,item.category_id,item.item_id)}>
				// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" version="1.1"><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm0 42C11 42 2 33 2 22S11 2 22 2s20 9 20 20-9 20-20 20z" clipRule="evenodd"></path><path fillRule="evenodd" d="M32 20c1.1 0 2 .9 2 2s-.9 2-2 2H12c-1.1 0-2-.9-2-2s.9-2 2-2h20z" clipRule="evenodd"></path></svg>
				// 		</span>
				// 		{this.state.quantity!==0?<span role="button" className="food_add_box_s">{this.state.quantity}</span>:null}
				// 		<span className="food_add" onClick={this.handleReduceAdd.bind(this,index,i,item.category_id,item.item_id)}>
				// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" version="1.1"><path fill="none" d="M0 0h44v44H0z"/><path fillRule="evenodd" d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm10 24h-8v8c0 1.1-.9 2-2 2s-2-.9-2-2v-8h-8c-1.1 0-2-.9-2-2s.9-2 2-2h8v-8c0-1.1.9-2 2-2s2 .9 2 2v8h8c1.1 0 2 .9 2 2s-.9 2-2 2z" clipRule="evenodd"/></svg>
				// 		</span>
				// 	</div>
			})
			return(
				<section key={index}>
					<h3>{items.name}</h3>
					{goodContext}
				</section>
			)
		})
		
		return(
			<div className="shoplist" ref={(body)=>this.body=body}>
				<div className="shoplist_box">
					<ul className="left_cat">
						{categoryContext}
					</ul>
					<div className="shoplist_main" ref={(main)=>this.main=main}>
						<div className="shoplist_main_scroll" ref={(listHeightDom)=>this.listHeightDom=listHeightDom}>
							{goodsListContext}
						</div>
					</div>
					<Footer
					allPrice={this.state.allPrice} 
					num={this.state.num} 
					mainFoods={isSave?isSave[id].entities:[]} 
					data={this.props.basicData}
					handleFooterAdd={this.handleFooterAdd.bind(this)}
					handleFooterReduce={this.handleFooterReduce.bind(this)}
					emptyAllFoods={this.emptyAllFoods.bind(this)}
					/>
				</div>
			</div>
		)
	}
}