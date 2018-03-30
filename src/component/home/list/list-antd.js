import React from 'react';
import { ListView } from 'antd-mobile';
import '../home.css'
import {BrowserRouter as Router,Link} from 'react-router-dom';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      data:[],
      isLoading: true,
      page:0
    };
  }

  componentDidMount() {
    let myFetchOptions = {method: 'GET'};
  
      fetch('shopping/restaurants?latitude=39.90323&longitude=116.39772&offset=20&limit=0&extras[]=activities&terminal=h5', myFetchOptions)
      .then(response => response.json())
      .then(json => {console.log(json),
      this.setState({
        data:json,
        dataSource: this.state.dataSource.cloneWithRows(json),
        isLoading: false,
      })});
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    console.log('onEndReached')
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
     let myFetchOptions = {method: 'GET'};
    console.log(this.state.page)
    this.setState({
      page:this.state.page+=1
    })
      fetch('shopping/restaurants?latitude=39.90323&longitude=116.39772&offset=20&limit=0&extras[]=activities&terminal=h5' + this.state.page, myFetchOptions)
            .then(response => response.json())
            .then(json => {console.log(json),
            this.setState({
              data:json,
        dataSource: this.state.dataSource.cloneWithRows(json),
        isLoading: false,
      })});
  }
  /*图片格式化*/
  _formatImg(){
    let img=this.props.data.image_path
    let png=/png/g.test(img);
    img=`${img}${png?'.png':'.jpeg'}`
    let imgValue=img.split('');
    imgValue.splice(3,0,'/');
    imgValue.splice(1,0,'/');
    return imgValue.join('');
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    let index = this.state.data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = this.state.data.length - 1;
      }

      const obj = this.state.data[index--];
      //console.log(this.state.data)
      //console.log(obj)
      
      return (
      
        <div key={rowID} style={{ padding: '0 15px' }}>
        <Link className='list-item' to={{
        pathname: `detail/${obj.id}`,
        }}>
          <section className='good_item'>
          <div className='good_item_logo'>
              <img />
          </div>
          <div className='good_item_detail'>
              <h4 className='flex_line'></h4>
              <div></div>
          </div>
        </section>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{obj.name}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{obj.price}</span>¥</div>
            </div>
          </div>
           </Link>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>食物列表</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
