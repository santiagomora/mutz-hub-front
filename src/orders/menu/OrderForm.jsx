import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';
import {
    COLUMNS,
    gridElem
} from './GridElement.jsx';
import{
    BASE_URL
} from '../../components/api.jsx';

import Modal from '../../components/control/Modal.jsx';
import Tabs from '../../components/control/Tabs.jsx';
import SelectVariations from './SelectVariations.jsx';

const WIDTH = 100;

const HEIGHT = 100;

export default class OrderForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal:false,
            selected:null,
            items:[]
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(data){
        return e => {
            const modal = !this.state.modal;
            this.setState({modal,selected:data||this.state.selected});
        }
    }

    render(){
        const props = this.props,
            shop=props.stored.shop,
            selected = this.state.selected;
        return (
            <>
                <Modal
                    show={this.state.modal}>
                    <SelectVariations
                        saveOrder={props.save}
                        toggleModal={this.toggleModal()}
                        selected={{selected}}/>
                </Modal>
                <div className="container-fluid mvpadding">
                    <div className="row">
                        <div className="col-md-10 nopadding alignleft">
                            <h2 className="alignleft bolder">{`${shop.name} menu.`}</h2>
                            <div>
                                <h5>{shop.description}</h5>
                                <p>Click on each menu item to see its variations and extra ingredients.</p>
                            </div>
                        </div>
                        <div className="col-md-2 alignright">
                            <img
                                src={`${BASE_URL}${shop.pic}`}
                                width={`${WIDTH}px`}
                                height={`${HEIGHT}px`}/>
                        </div>
                    </div>
                    <Tabs
                        first="Pizzas"
                        shop={shop}
                        data={props.data}
                        clickHandler={this.toggleModal}
                        grid={{
                            elem:gridElem,
                            columns:props.display ? COLUMNS-1 : COLUMNS
                        }}/>
                    <div className="row justify-content-end">
                        <div className="col-md-3">
                            <Link to={{
                                    pathname:"/checkout",
                                    state:props.location.state
                                }}>
                                <button
                                    onClick={()=>false}
                                    style={{backgroundColor:"var(--main)"}}
                                    className="button bolder wfull">
                                    I'm ready to pay!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
