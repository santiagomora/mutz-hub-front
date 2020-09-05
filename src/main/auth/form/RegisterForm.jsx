import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';

import Text from '../../../components/input/Text.jsx';

import Password from '../../../components/input/Password.jsx';

import Loader from 'react-loader-spinner';

import ValidationHandler from '../../../components/hocs/ValidationHandler.jsx';

function RegisterForm({
    form,
    errors,
    changeText,
    submit,
    loading,
    profile
}){
    const prclass = profile
        ? "col-md-6"
        : "col-md-12"
    return (
        <form
            autoComplete="off"
            className="container-fluid mvpadding">
            <div className="row">
                <div className={`${prclass} sbpadding`}>
                    <Text
                        title="Your Email *"
                        name="cli_email"
                        rows={1}
                        holder="your email"
                        value={form.cli_email}
                        changeHandler={changeText}
                        errors={errors.cli_email}/>
                </div>
                <div className={`${prclass} sbpadding`}>
                    <Password
                        title="Your password *"
                        name="cli_password"
                        rows={1}
                        holder="password"
                        value={form.cli_password}
                        changeHandler={changeText}
                        errors={errors.cli_password}/>
                </div>
                <div className={`${prclass} sbpadding`}>
                    <Text
                        title="Your name *"
                        name="cli_name"
                        rows={1}
                        holder="your name"
                        value={form.cli_name}
                        changeHandler={changeText}
                        errors={errors.cli_name}/>
                </div>
                <div className={`${prclass} sbpadding`}>
                    <Text
                        title="Your address *"
                        name="cli_address"
                        rows={1}
                        holder="your address"
                        value={form.cli_address}
                        changeHandler={changeText}
                        errors={errors.cli_address}/>
                </div>
                <div className={`col-md-12 sbpadding`}>
                    <Text
                        title="Your phone number *"
                        name="cli_telephone"
                        rows={1}
                        holder="your phone number"
                        value={form.cli_telephone}
                        changeHandler={changeText}
                        errors={errors.cli_telephone}/>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-12 stpadding alignright">
                    {
                        !profile
                            ?
                                <Link to="/auth">
                                    <span className="shmargin bolder dark">
                                        i have an account
                                    </span>
                                </Link>
                            : <></>
                    }
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

export default ValidationHandler( RegisterForm )
