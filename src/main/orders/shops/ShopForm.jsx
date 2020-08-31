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
        <div className="container-fluid mvpadding aligncenter">
            <div className="row">
                <h2 className="alignleft bolder">pizza hubs.</h2>
            </div>
            <div className="row" style={{paddingBottom:"15px"}}>
                click on each shop to see its menu.
            </div>
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
    )
}

export default RequestHandler(
    ShopForm, {
    options: (params) =>({
        url:"shop/list"
    }),
    method:'get'
});
