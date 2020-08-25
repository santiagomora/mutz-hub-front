import React from 'react';
import {
    Toggle
} from '../input/Toggle.jsx';
import {
    withRouter
} from 'react-router-dom';

import Link from './Link.jsx';

export default withRouter( Title )

function Title({
    change,
    changeCurrency,
    logout,
    user,
    currency
}) {
    return (
        <>
            <div className="col-md-6 col-sm-12" >
                <Link to="/">
                    <h1 className="app-title bolder">
                        the mutz hub.
                    </h1>
                </Link>
            </div>
            <div className="col-md-6 col-sm-12 alignright">
                <div style={{
                        position:"absolute",
                        bottom:"5px",
                        right:"15px"
                    }}>
                    {
                        user
                        ?
                                <div className="bolder iblock">
                                    {`Welcome, ${user.cli_name}`}
                                </div>
                        : <></>
                    }
                    <div className="iblock">
                        <Toggle
                            changeSide={changeCurrency}
                            rightTitle={currency[1]}
                            leftTitle={currency[0]}
                            name="currency"
                            side={change.curr}/>
                    </div>
                    <div className="iblock">
                    {
                        user
                            ?
                                <>
                                    <Link to='/dashboard'>
                                        <span className="shmargin button greenback bolder">
                                            My account
                                        </span>
                                    </Link>
                                    <button
                                        onClick={e => {e.preventDefault(); logout();}}
                                        className="iblock button bolder red">
                                        logout
                                    </button>
                                </>
                            :
                                <Link to="/auth">
                                    <span className="greenback button bolder">
                                        Login / Register
                                    </span>
                                </Link>
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
