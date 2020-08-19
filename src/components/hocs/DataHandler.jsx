import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    GET
} from "../api.jsx";

import LoadingComponent from './LoadingComponent.jsx';

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
                    endpoint:props.endpoint,
                    data:{}
                })
                .then( res => {
                    this.setState({data:res.data})
                } )
                .catch( err =>{
                    console.log(err);
                });
        else this.setState({data:true})
    }

    render(){
        const props = this.props;
        return (
            <>
                <LoadingComponent data={this.state.data}>
                {
                    React.cloneElement(
                        this.props.children,{
                            ...this.props,
                            data:this.state.data
                        }
                    )
                }
                </LoadingComponent>
            </>
        )
    }
}
