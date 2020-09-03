import React, {
    Component,
    useState
} from 'react';

import Text from '../../../../components/input/Text.jsx';

import Loader from 'react-loader-spinner';

import ValidationHandler from '../../../../components/hocs/ValidationHandler.jsx';

function CheckoutForm({
    form,
    errors,
    changeText,
    submit,
    loading,
    cancel
}) {
    return (
        <div className="container-fluid mvpadding lightbox">
            <div className="row">
                <div className="col-md-6">
                    <Text
                        title="Your name *"
                        name="ord_cli_name"
                        rows={1}
                        holder="your name"
                        value={form.ord_cli_name}
                        changeHandler={changeText}
                        errors={errors.ord_cli_name}/>
                </div>
                <div className="col-md-6">
                    <Text
                        title="Your address *"
                        name="ord_cli_address"
                        rows={1}
                        holder="the delivery address"
                        value={form.ord_cli_address}
                        changeHandler={changeText}
                        errors={errors.ord_cli_address}/>
                </div>
            </div>
            <div className="row mtpadding">
                <div className="col-md-6">
                    <Text
                        title="Your phone *"
                        name="ord_cli_telephone"
                        rows={1}
                        holder="your phone number"
                        value={form.ord_cli_telephone}
                        changeHandler={changeText}
                        errors={errors.ord_cli_telephone}/>
                </div>
                <div className="col-md-6">
                    <Text
                        title="Your email *"
                        name="ord_cli_email"
                        rows={1}
                        holder="your email"
                        value={form.ord_cli_email}
                        changeHandler={changeText}
                        errors={errors.ord_cli_email}/>
                </div>
            </div>
            <div className="row mtpadding">
                <div className="col-md-12">
                    <Text
                        title="Observations"
                        name="ord_observations"
                        rows={3}
                        holder="any request or comments about your order."
                        value={form.ord_observations}
                        changeHandler={changeText}
                        errors={errors.ord_observations}/>
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-md-12 alignright">
                    required fields are marked with
                    <span className="shmargin bolder">*</span>
                </div>
                <div className="col-md-10 stpadding alignright">
                    {
                        loading
                        ?   <div className="iblock shmargin">
                                <Loader
                                    type="TailSpin"
                                    color="var(--dgray)"
                                    height={30}
                                    width={30} />
                            </div>
                        : <></>
                    }
                    <button
                        onClick={cancel}
                        className="bolder iblock">
                        cancel
                    </button>
                    <button
                        onClick={submit}
                        className="button iblock bolder"
                        style={{backgroundColor:"var(--main)"}}>
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ValidationHandler( CheckoutForm )
