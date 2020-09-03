import React, {
    useState
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
} from '../../../utils/api.jsx';
import {
    storage,
} from '../../../helper/helperIndex.jsx';
import {
    RESOURCE_URL
} from '../../../utils/api.jsx';

import Modal from '../../../components/control/Modal.jsx';

import MenuDisplay from '../../../components/control/MenuDisplay.jsx';

import SelectVariations from './SelectVariations.jsx';

import LoadingComponent from '../../../components/composition/LoadingComponent.jsx';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';


const HEIGHT = 100;

function OrderForm( props ) {

    const [state,changeState] = useState({
            modal:false,
            selected:null,
            items:[],
            data:null,
            pic:''
        }),
        toggleModal = (data) => (
            e => {
                const modal = !state.modal;
                changeState({
                    modal,
                    selected:data||state.selected
                })
            }
        ),
        { shop,display,change,data,convert } = props,
        {selected} = state;

    return (
        <div className="container-fluid mvpadding   ">
            <Modal
                show={state.modal}>
                <SelectVariations
                    change={change}
                    saveOrder={props.save}
                    convert={convert}
                    toggleModal={toggleModal()}
                    selected={selected}/>
            </Modal>
            <LoadingComponent
                data={data}>
                <MenuDisplay
                    first="Pizzas"
                    shop={shop}
                    data={data}
                    clickHandler={toggleModal}
                    grid={{
                        elem:GridElement,
                        columns:display ? COLUMNS-1 : COLUMNS,
                        extra:{ shop,display,change,convert }
                    }}/>
            </LoadingComponent>
        </div>
    );
}

export default RequestHandler(
    OrderForm, {
        options:({id}) => ({
            url:`menu/${id}`
        }),
        method:'get'
    }
)
/*

<div className="row shopheader">
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
*/
