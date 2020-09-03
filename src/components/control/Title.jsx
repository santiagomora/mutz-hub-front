import React from 'react';
import {
    Toggle
} from '../input/Toggle.jsx';
import {
    withRouter
} from 'react-router-dom';
import {
    storage
} from '../../helper/helperIndex.jsx';
import {
    Link
} from 'react-router-dom';

export default withRouter( Title )

function Title({
    change,
    changeCurrency,
    user,
    logout,
    currency
}) {
    return (
        <>
            <div className="col-md-4 col-sm-12" >
                <Link to="/">
                    <h1 className="nomargin app-title bolder">
                        the mutz hub.
                    </h1>
                </Link>
            </div>
            <div className="col-md-8 col-sm-12 alignright align-items-center">
                <div className="iblock mtmargin">
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
