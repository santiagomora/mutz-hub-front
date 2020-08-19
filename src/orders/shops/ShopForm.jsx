import React from 'react';
import {
    DisplayGrid
} from '../../components/helper/gridRender.jsx';
import {
    gridElem,
    COLUMNS
} from './GridElement.jsx';
import ReactDOM from 'react-dom';

export default function(props) {
    const data = Object.values(props.data);
    return (
        <div className="container-fluid mvpadding aligncenter">
            <div className="row">
                <h2 className="alignleft bolder">pizza hubs.</h2>
            </div>
            <div className="row" style={{paddingBottom:"15px"}}>
                click on each shop to see its menu.
            </div>
            {DisplayGrid(data,gridElem,COLUMNS)}
        </div>
    )
}
