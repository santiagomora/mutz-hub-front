import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Link from '../../../components/control/Link.jsx';

import Text from '../../../components/input/Text.jsx';

import Password from '../../../components/input/Password.jsx';

import Loader from 'react-loader-spinner';

export default function ({
    form,
    errors,
    changeText,
    submit,
    loading,
    location
}){
    return (
        <form className="container-fluid mvpadding">
            <div className="row">
                <div className="col-md-12 sbpadding">
                    <Text
                        title="Your Email *"
                        name="email"
                        rows={1}
                        holder="your email"
                        value={form.email}
                        changeHandler={changeText}
                        errors={errors.email}/>
                </div>
                <div className="col-md-12 sbpadding">
                    <Password
                        title="Your password *"
                        name="password"
                        rows={1}
                        holder="password"
                        value={form.password}
                        changeHandler={changeText}
                        errors={errors.password}/>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-12 stpadding alignright">
                    <Link to="/auth/register">
                        <span className="dark shmargin bolder">
                            create an account
                        </span>
                    </Link>
                    <button
                        onClick={submit}
                        className="iblock button mtmargin bolder"
                        style={{backgroundColor:"var(--main)"}}>
                        submit
                    </button>
                    {
                        loading
                        ?   <div className="iblock shmargin stpadding amargin">
                                <Loader
                                    type="TailSpin"
                                    color="var(--dgray)"
                                    height={30}
                                    width={30} />
                            </div>
                        : <></>
                    }
                </div>
            </div>
        </form>
    );
}
