import React,{
    Component,
    useContext
} from 'react';
import {
    DisplayGrid
} from '../../../components/grid/DisplayGrid.jsx';
import {
    GridElement,
    COLUMNS
} from './GridElement.jsx';
import {
    storage
} from '../../../helper/helperIndex.jsx';

import SectionTitle from '../../../components/control/SectionTitle.jsx';

import ExchangeContext from '../../../context/ExchangeContext.jsx';

import LoadingComponent from '../../../components/composition/LoadingComponent.jsx';

import RequestHandler from '../../../components/hocs/RequestHandler.jsx';

function ShopForm (props) {
    const extra = {
            click:( shop ) => {
                storage.set('shop',shop);
                props.history.push( `/menu/${shop.id}` )
            },
            change:props.change,
            convert:props.convert
        };

    return (
        <div className="container-fluid mvpadding">
            <SectionTitle
                description="choose your shop"
                iconurl="/img/shop_icon.png"
                title="Pizza hubs."/>
            <div className="row">
                <div className="col-md-12 mvpadding">
                    <div className="container-fluid">
                        <LoadingComponent
                            data={props.data}>
                            {
                                DisplayGrid({
                                    data:Object.values(props.data||{}),
                                    extra,
                                    GridElement,
                                    colNum:props.display ? COLUMNS-1 : COLUMNS
                                })
                            }
                        </LoadingComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestHandler(
    ShopForm, {
    options: (params) =>({
        url:"shop/list"
    }),
    method:'get'
});
