import React, {
    useState,
    useEffect
} from 'react';
import {
    DisplayGrid
} from '../../components/grid/DisplayGrid.jsx';

import SectionTitle from './SectionTitle.jsx';

const WIDTH = "50px";

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
    const [tab,changeTab] = useState({}),
        [search,changeSearch] = useState(""),
        {shop} = props,
        clickTab = e => {
            e.preventDefault();
            const name = e.currentTarget.getAttribute('value'),
                pic = e.currentTarget.getAttribute('picture');
            changeTab({name,pic});
        },
        changeTerm = e => {
            const val = e.currentTarget.value;
            changeSearch(val);
        },
        {categories} = props.data;

    useEffect( () => {
        changeTab({name:props.first,pic:categories[0].picture})
    },[]);

    return (
        <div className="container-fluid nopadding">
            <SectionTitle
                title={shop.name}
                iconurl={shop.pic}
                bgurl={tab.pic}
                description={shop.description}/>
            <div className="row">
                <div
                    className="mtmargin col-md-3">
                    <div className="sticky-top mpadding lightbox" style={{zIndex:1,top:"15px"}}>
                        <h3 className="nomargin bolder selected">Categories</h3>
                        {
                            categories.map(
                                (e,i) => {
                                    const {description,menu,picture} = e;
                                    return (
                                        <div className="stpadding" key={i}>
                                            <button
                                                onClick={clickTab}
                                                className="nopadding wfull mtmargin"
                                                picture={picture}
                                                value={description}>
                                                <div className="fifty alignleft iblock">
                                                    <h5 className={
                                                            description === tab.name
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
                            <h4 className="bolder selected">Search</h4>
                            <p> start typing to search in the current category </p>
                            <input
                                type="text"
                                value={search}
                                onChange={changeTerm}
                                placeholder={`search ${tab.name}`}
                                className="search wfull"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 nopadding">
                    <div className="container-fluid" >
                        {
                            categories.filter( e => e.description === tab.name ).map(
                                (e,i) => {
                                    const {description,menu,extras} = e;
                                    return (
                                        <div className="row" key={i}>
                                            <div className="col-md-12">
                                                <h3 className="bolder mtpadding">
                                                    {e.description}
                                                </h3>
                                                <div className="grayline"></div>
                                            </div>
                                            <div className="col-md-12 sbmargin mtpadding">
                                                <div className="container-fluid">
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
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
/*

    <div
        className="row dgrayback whitefont"
        style={{overflow:"hidden"}}
        key={i}>
        <div className="col-md-8 nopadding">
        </div>
    </div>*/
