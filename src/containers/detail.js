import React from 'react';
// import PageHeader from '../component/common/pageHeader';
// import Info from '../component/detail/info/info';
// import Comment from '../component/detail/comment/comment';
export default class Detail extends React.Component{
    render(){
        const params=this.props.params;
        return(
            <div>
<h1>tes</h1>
              <h1>test {params.id}</h1>
            </div>
        );
    }
}
