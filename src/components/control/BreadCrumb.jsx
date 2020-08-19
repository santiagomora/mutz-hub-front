import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const crumbs = {
    shops:{
        section:"shops",
        title:"Choose your shop",
        link:(id) => "/shops",
        width:"34%",
        paint:["shops"]
    },
    order:{
        section:"order",
        title:"Place your order",
        link:(id) => `/order/${id}`,
        width:"67%",
        paint:["shops","order"]
    },
    checkout: {
        section:"checkout",
        title:"Verify your order",
        link:(id) => "/checkout",
        width:"100%",
        paint:["shops","order","checkout"]
    }
};

const getCrumbs =
    current => Object.values(crumbs).map(
        e => e.section === current ? {disable:true,...e} : e
    );

export default class BreadCrumb extends Component {
    constructor(props){
        super(props)
    }

    render (){
        let stored = '',
            display = null;
        const props = this.props,
            items = getCrumbs(props.current),
            curr = crumbs[props.current],
            location = props.location,
            order = location.order||{},
            hasOrder = (order.items||[]).length>0;
        return (
            <>
                <div className="container-fluid">
                    <div className="row mvpadding">
                    {
                        items.map(
                            (e,i) => {
                                const isEnabled = curr.paint.indexOf(e.section) === -1,
                                    paint = hasOrder||!isEnabled
                                        ? {color:"var(--main)"}
                                        : {color:"lightgray"}
                                return (
                                    <div
                                        key={i}
                                        className="col-md-4 aligncenter">
                                    {
                                        hasOrder||!isEnabled
                                        ?
                                            <Link to={{
                                                pathname:e.link((location.shop||{}).id),
                                                state:location
                                            }}>
                                                <span
                                                    className="bolder"
                                                    style={paint}>
                                                    {e.title}
                                                </span>
                                            </Link>
                                        :
                                            <>
                                                <span
                                                    className="bolder"
                                                    style={paint}>
                                                    {e.title}
                                                </span>
                                            </>
                                    }
                                    </div>
                                );
                            }
                        )
                    }
                    </div>
                </div>
            </>
        )
    };
}
