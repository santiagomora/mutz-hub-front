import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function NotFound({data}){
    return (
        <div className="container-fluid mvpadding">
            <div className="row mvpadding">
                <div className="col-md-12">
                    <h1>
                        <span className="bolder shmargin">404,</span>
                        page not found
                    </h1>
                    <h1 >
                        <span className="bolder">Woops,</span>
                        We couldn't find the page <br/>you where looking for
                    </h1>
                    <h2 className="bolder alignright">
                        Go get some
                        <span className="bolder shmargin">more pizza</span>
                        <Link to="/">
                            <span className="shmargin button">clicking Here</span>
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}
