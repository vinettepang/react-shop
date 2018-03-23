import React from 'react';


export default class Buy extends React.Component{
    render(){
        const params=this.props.match.params;
        console.log(this.props.match.params)
        return(
            <div>
                buy
            </div>
        );
    }
}
