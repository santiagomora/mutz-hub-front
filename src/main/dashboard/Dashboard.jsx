import React,{
    Component
} from 'react';
import {
    Redirect
} from 'react-router-dom';
import {
    GET,
    PUT
} from '../../components/api.jsx';
import {
    OrderPreview
} from '../../components/hocs/OrderVisualization.jsx'
import {
    toggleItem
} from '../../components/helper/toggleItem.jsx';

import LoadingComponent from '../../components/hocs/LoadingComponent.jsx'

import Profile from './sections/Profile.jsx'

import TableSection from './sections/TableSection.jsx'

function getOrders(id){
    return GET({
            url:`/order/list/client/${id}`
        })
        .then( res => {
            this.setState({
                data:res.data
            })
        })
        .catch( (err) => {
            console.log(err);
        });
}


function updateUser(id){
    return PUT({
            url:`/client/update`
        })
        .then( res => {
            this.setState({
                data:res.data
            })
        })
        .catch( (err) => {
            console.log(err);
        });
}

export default class Dashboard extends Component{
    constructor( props ){
        super( props );
        this.state = {};
        this.toggleItem = toggleItem.bind( this );
        this.getOrders = getOrders.bind(this);
        this.updateUser = updateUser.bind(this);
    }

    componentDidMount(){
        this.getOrders(this.props.user.cli_id);
    }

    render(){
        const props = this.props,
            user = props.user,
            loc = props.location.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="bolder iblock">Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <LoadingComponent
                        data={this.state.data}>
                        <div className="col-md-12">
                            <TableSection
                                data={this.state.data} />
                        </div>
                    </LoadingComponent>
                </div>
                <div className="row mtpadding">
                    <div className="col-md-7">
                        <h3 className="bolder">Personal information</h3>
                        <Profile
                            location={props.location}
                            user={user}/>
                    </div>
                    <div className="col-md-5 nopadding">
                        <h3 className="bolder">Current order</h3>
                        <OrderPreview
                            toggleItem={this.toggleItem}
                            state={loc}/>
                    </div>
                </div>
            </div>
        )
    }
}
