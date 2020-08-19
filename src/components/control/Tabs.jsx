import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
    DisplayGrid
} from "../helper/gridRender.jsx";

const filter = (data,term) => {
    return data.filter(
        e => {
            const exp = new RegExp(`.*${term}.*`,"gi");
            return e.name.match(exp)||e.description.match(exp);
        }
    )
}

export default function Tabs(props) {
    const [tab,changeTab] = useState(props.first),
        [search,changeSearch] = useState(""),
        clickTab = e => {
            e.preventDefault();
            changeTab(e.currentTarget.getAttribute('value'));
        },
        changeTerm = e => {
            const val = e.currentTarget.value;
            changeSearch(val);
        }
    return (
        <div className="container-fluid nopadding">
            <div className="grayline mvmargin row"></div>
            <div className="row container-fluid nopadding" style={{margin:"0px"}}>
                {
                    Object.keys(props.data).map(
                        (e,i) => {
                            return (
                                    <div
                                        key={i}
                                        className="col-md-3 alignleft nopadding aligncenter">
                                        <button
                                            onClick={clickTab}
                                            className="nopadding"
                                            value={e}>
                                            <h4 className={
                                                e === tab
                                                    ? "bolder nomargin"
                                                    : "bolder nomargin light"
                                                }>
                                                    {e}
                                            </h4>
                                        </button>
                                    </div>
                            )
                        }
                    )
                }
                <div className="col-md-3 nopadding">
                    <input
                        type="text"
                        value={search}
                        onChange={changeTerm}
                        placeholder={`search ${tab}`}
                        className="search wfull"/>
                </div>
            </div>
            <div className="grayline mvmargin row"></div>
            <div
                className="row container-fluid nopadding"
                style={{margin:"0px"}}>
                {
                    Object.keys(props.data).map(
                        (e,i) => {
                            return (
                                    <div
                                        key={i}
                                        className={
                                            e === tab
                                                ? "row col-md-12 nopadding"
                                                : "hidden"
                                            }
                                        style={{margin:"0px"}}>
                                        <div
                                            className="container-fluid alignleft"
                                            style={{padding:"15px 0px"}}>
                                            {
                                                DisplayGrid(
                                                    filter(props.data[e],search),
                                                    props.grid.elem({
                                                        shop:props.shop,
                                                        clickHandler:props.clickHandler
                                                    }),
                                                    props.grid.columns
                                                )
                                            }
                                        </div>
                                    </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}
