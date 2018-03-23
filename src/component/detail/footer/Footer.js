import React from 'react';

import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';

const tabs = [
  { title: '1 Tab' },
  { title: '2 Tab' },
  { title: '3 Tab' },
  { title: '2 Tab' },
  { title: '3 Tab' },
  { title: '2 Tab' },
  { title: '3 Tab' },
];

const TabExample = (...state) => (

  <div style={{ height: 500 }}>
    <WhiteSpace />
    <Tabs tabs={tabs}
      initalPage={'t2'}
      tabBarPosition="left"
      tabDirection="vertical"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        {this.props.state}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
    <WhiteSpace />
  </div>
);
export default class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            tabs:[],
            group:[]
        }
    }
    getData(){
        const group = []
        this.state.data.map((val)=>(
            console.log(val),
            group.push({"title":val.title})
        ))
        this.setState({
            tabs:group
        }) 
        console.log(group)
    }
    componentDidMount(){
        // console.log(this.props.id)
        console.log(this.state.tabs)
        fetch('http://localhost:3001/api/detail/detailfoods/'+this.props.id,{method:'GET'}).then(response => response.json())
            .then(json => {
                    this.setState({
                        data: json
                    }) 
                    this.getData()
                });
    }
    render(){
        const params=this.props;
        console.log(params)
        console.log(this.state.data)

        return(
            <div>
                加载中
            </div>
        );
    }
}
