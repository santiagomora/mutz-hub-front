import React, {
    useState
} from 'react';
import {
    DisplayGrid
} from '../../components/grid/DisplayGrid.jsx';
import{
    RESOURCE_URL
} from '../../utils/api.jsx';

const filter = (data,term) => {
    return data.filter(
        e => {
            const exp = new RegExp(`.*${term}.*`,"gi"),
                {name,description} = e;
            return name.match(exp)||description.match(exp);
        }
    )
}

export default function MenuDisplay(props) {
    const [tab,changeTab] = useState(props.first),
        [search,changeSearch] = useState(""),
        clickTab = e => {
            e.preventDefault();
            changeTab(e.currentTarget.getAttribute('value'));
        },
        changeTerm = e => {
            const val = e.currentTarget.value;
            changeSearch(val);
        },
        {categories} = props.data;
    return (
        <div className="container-fluid nopadding">
            <div className="row mtpadding">
                <div className="col-md-3" style={{paddingLeft:"0px"}}>
                    <div className="sticky-top mvpadding"
                        style={{zIndex:0,backgroundColor:"white"}}>
                        <h4 className="bolder">Categories</h4>
                        <div className="secondary-line"></div>
                        {
                            categories.map(
                                (e,i) => {
                                    const {description,menu} = e;
                                    return (
                                        <div className="stpadding" key={i}>
                                            <button
                                                onClick={clickTab}
                                                className="nopadding wfull mtmargin"
                                                value={description}>
                                                <div className="fifty alignleft iblock">
                                                    <h5 className={
                                                            description === tab
                                                                ? "bolder nomargin iblock fifty"
                                                                : "bolder nomargin light iblock fifty"
                                                        }>
                                                        {description}
                                                    </h5>
                                                </div>
                                                <div className="fifty alignright iblock">
                                                    <div
                                                        className="variation stext bolder iblock shmargin button"
                                                        style={{padding:"0px 5px"}}>
                                                        {`${e.menu.length} items`}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    )
                                }
                            )
                        }
                        <div className="mvpadding">
                            <input
                                type="text"
                                value={search}
                                onChange={changeTerm}
                                placeholder={`search ${tab}`}
                                className="search wfull"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 container-fluid">
                {
                    categories.filter( e => e.description === tab ).map(
                        (e,i) => {
                            const {description,menu,extras} = e;
                            return (
                                <div key={i}>
                                    <img style={{maxWidth:"100%"}} src={`${RESOURCE_URL}${e.picture}`}/>
                                    {
                                        DisplayGrid({
                                            data:filter(menu,search),
                                            GridElement:props.grid.elem({
                                                clickHandler:props.clickHandler
                                            }),
                                            extra:{
                                                ...props.grid.extra,
                                                extras
                                            },
                                            colNum:props.grid.columns
                                        })
                                    }
                                </div>
                            )
                        }
                    )
                }
                </div>
            </div>
        </div>
    );
}

/*

<div className="col-md-3 nopadding">
</div>
</div>
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

                        </div>
                    </div>
            )
        }
    )
}
</div>*/
