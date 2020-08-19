import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import Text from '../../../components/input/Text.jsx';

const validation = {
    ord_cli_address:{
        required:true,
        max:100
    },
    ord_cli_telephone:{
        required:true,
        max:30
    },
    ord_cli_name:{
        required:true,
        max:50
    },
    ord_cli_email:{
        required:true,
        max:80
    },
    ord_observations:{
        required:false,
        max:250
    }
}

const fieldDisplay ={
    ord_cli_address:"Delivery address",
    ord_cli_telephone:"Phone number",
    ord_cli_name:"Name",
    ord_cli_email:"Email",
    ord_observations:"Observations"
}

const evaluate = {
    required: {
        eval:(e,p) => p ? e.length<=0 : false,
        mess:(name,p) => `the field ${fieldDisplay[name]} is required.`
    },
    max: {
        eval:(e,max) => e.length>max,
        mess:(name,max) => `the field ${fieldDisplay[name]} can't exceed ${max} characters.`
    }
};

const checkValue = ({
    value,
    name
}) => {
    const rules = validation[name],
        ruleNames = Object.keys(rules);
    return ruleNames.reduce(
        (err,rule,i) => {
            const param = rules[rule];
            let msg;
            if( evaluate[rule].eval(value,param) ){
                msg = evaluate[rule].mess(name,param);
                err = [...err,msg];
            }
            return err;
        },[]
    )
}

const finalCheck = (arr) => arr.filter( e => e.length>0 ).pop();

export default class CheckoutForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            form:{
                ord_cli_address:"asd",
                ord_cli_telephone:"asd",
                ord_cli_name:"asd",
                ord_cli_email:"asd",
                ord_observations:"asd",
            },
            errors:{}
        }
        this.changeText = this.changeText.bind(this);
        this.checkErrors = this.checkErrors.bind(this);
        this.submit = this.submit.bind(this);
    }

    checkErrors({value,name}){
        const errors = {};
        errors[name] = checkValue({value,name});
        return errors;
    }

    changeText(e){
        e.preventDefault();
        const value = e.currentTarget.value,
            name = e.currentTarget.getAttribute("name"),
            form = this.state.form,
            errors = this.state.errors;
        form[name] = value;
        this.setState({
            form,
            errors:{
                ...errors,
                ...this.checkErrors({value,name})
            }
        })
    }

    submit(e){
        e.preventDefault();
        const form = this.state.form,
            errors = Object.keys(form).reduce(
                (t,e) => ({
                    ...t,
                    ...this.checkErrors({name:e,value:form[e]})
                }),{}
            );
        if ( finalCheck( Object.values( errors ) ) )
            this.setState({errors})
        else{
            POST({
                endpoint:"/order/save",
                data:{...this.props.order,...form}
            })
            console.log()
        }
    }

    render(){
        const props = this.props,
            s = this.state;
        return (
            <div className="container-fluid mvpadding">
                <div className="row">
                    <div className="col-md-6">
                        <Text
                            title="Your name *"
                            name="ord_cli_name"
                            rows={1}
                            holder="your name"
                            value={s.form.ord_cli_name}
                            changeHandler={this.changeText}
                            errors={s.errors.ord_cli_name}/>
                    </div>
                    <div className="col-md-6">
                        <Text
                            title="Your address *"
                            name="ord_cli_address"
                            rows={1}
                            holder="the delivery address"
                            value={s.form.ord_cli_address}
                            changeHandler={this.changeText}
                            errors={s.errors.ord_cli_address}/>
                    </div>
                </div>
                <div className="row mtpadding">
                    <div className="col-md-6">
                        <Text
                            title="Your phone *"
                            name="ord_cli_telephone"
                            rows={1}
                            holder="your phone number"
                            value={s.form.ord_cli_telephone}
                            changeHandler={this.changeText}
                            errors={s.errors.ord_cli_telephone}/>
                    </div>
                    <div className="col-md-6">
                        <Text
                            title="Your email *"
                            name="ord_cli_email"
                            rows={1}
                            holder="your email"
                            value={s.form.ord_cli_email}
                            changeHandler={this.changeText}
                            errors={s.errors.ord_cli_email}/>
                    </div>
                </div>
                <div className="row mtpadding">
                    <div className="col-md-12">
                        <Text
                            title="Observations"
                            name="ord_observations"
                            rows={3}
                            holder="any request or comments about your order."
                            value={s.form.ord_observations}
                            changeHandler={this.changeText}
                            errors={s.errors.ord_observations}/>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-12 alignright">
                        required fields are marked with
                        <span className="shmargin bolder">*</span>
                    </div>
                    <div className="col-md-4 stpadding">
                        <button
                            onClick={this.submit}
                            className="button bolder wfull"
                            style={{backgroundColor:"var(--main)"}}>
                            submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
