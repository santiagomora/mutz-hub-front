import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    GET
} from "../api.jsx";

import LoadingComponent from './LoadingComponent.jsx';

function RenderChildren({data,props}){
    return(
        <LoadingComponent data={data}>
        {
            React.cloneElement(
                props.children,{
                    ...props,
                    data
                }
            )
        }
        </LoadingComponent>
    )
}

export default class DataHandler extends Component {

    constructor(props){
        super(props);
        this.state={data:null}
    }

    componentDidMount(){
        const props = this.props;
        let req;
        if ( props.endpoint )
            req = GET({
                    url:props.endpoint
                })
                .then( res => {
                    this.setState({data:res.data})
                } )
                .catch( err =>{
                    console.log(err);
                });
    }

    render(){
        const data = this.props.endpoint ? this.state.data : true;
        return (
            <RenderChildren
                data={data}
                props={this.props}/>
        )
    }
}
