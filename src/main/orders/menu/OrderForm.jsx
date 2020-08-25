import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    Redirect
} from 'react-router-dom';
import {
    COLUMNS,
    GridElement
} from './GridElement.jsx';
import{
    BASE_URL
} from '../../../components/api.jsx';

import Modal from '../../../components/control/Modal.jsx';

import Tabs from '../../../components/control/Tabs.jsx';

import SelectVariations from './SelectVariations.jsx';

import ConditionalRender from '../../../components/hocs/ConditionalRender.jsx';

import LoadingComponent from '../../../components/hocs/LoadingComponent.jsx';

const WIDTH = 100;

const HEIGHT = 100;

class OrderForm extends Component {

    constructor(props){
        super(props);
        this.state={
            modal:false,
            selected:null,
            items:[],
            data:null
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(data){
        return e => {
            const modal = !this.state.modal;
            this.setState({modal,selected:data||this.state.selected});
        }
    }

    componentDidMount(){
        this._ismounted = true;
        this.props.performRequest({
            options:{url:`/menu/${this.props.match.params.id}`},
            method:'get',
            successCallback: (res) => {
                if (this._ismounted)
                    this.setState({data:res.data})
            },
            errorCallback: (err) => console.log(err)
        });
    }

    componentWillUnmount(){
        this._ismounted = false;
    }

    render(){
        const props = this.props,
            { shop,display,change } = props.orderState,
            selected = this.state.selected;

        return (
            <>
                <Modal
                    show={this.state.modal}>
                    <SelectVariations
                        change={change}
                        saveOrder={props.save}
                        toggleModal={this.toggleModal()}
                        selected={selected}/>
                </Modal>
                <div className="container-fluid mvpadding">
                    <div className="row">
                        <div className="col-md-2">
                            <img
                                src={`${BASE_URL}${shop.pic}`}
                                width={`${WIDTH}px`}
                                height={`${HEIGHT}px`}/>
                        </div>

                        <div className="col-md-10 nopadding alignleft">
                            <h2 className="alignleft bolder">{`${shop.name} menu.`}</h2>
                            <div>
                                <h5>{shop.description}</h5>
                                <p>Click on each menu item to see its variations and extra ingredients.</p>
                            </div>
                        </div>
                    </div>
                    <LoadingComponent
                        data={this.state.data}>
                        <Tabs
                            first="Pizzas"
                            shop={shop}
                            data={this.state.data}
                            clickHandler={this.toggleModal}
                            grid={{
                                elem:GridElement,
                                columns:display ? COLUMNS-1 : COLUMNS,
                                extra:props.orderState
                            }}/>
                    </LoadingComponent>
                </div>
            </>
        );
    }
}

export default function(props){
    const {shop} = props.orderState;
    return (
        <ConditionalRender
            condition={!shop}
            other={
                <Redirect to={{
                    pathname:"/shops",
                    state:{}
                }}/>
            }>
            <OrderForm {...props}/>
        </ConditionalRender>
    )
}
