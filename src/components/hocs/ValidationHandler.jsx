import ReactDOM from 'react-dom';
import React, {
    Component
} from 'react';

const evaluate = {
    required: {
        eval:(e,p) => p ? e.length<=0 : false,
        mess:(name,p) => `the field ${name} is required.`
    },
    max: {
        eval:(e,max) => e.length>max,
        mess:(name,max) => `the field ${name} can't exceed ${max} characters.`
    },
    numeric: {
        eval:(e,p) => p ? ((e+"").match(/[^0-9]/gi)||[]).length>0 : false,
        mess:(name,max) => `the field ${name} must be numeric`
    },
    alphabetic: {
        eval:(e,p) => p ? ((e+"").match(/[^A-Za-z\s]/gi)||[]).length>0 : false,
        mess:(name,max) => `the field ${name} must be alphabetic`
    },
    email: {
        eval:(e,p) => p ? ((e+"").match(/\@/gi)||[]).length!==1 : false,
        mess:(name,max) => `the field ${name} must be a valid email address`
    }
};

const checkValue = ({
    value,
    name,
    validation,
    fieldDisplay
}) => {
    const rules = validation[name],
        ruleNames = Object.keys(rules);
    return ruleNames.reduce(
        (err,rule,i) => {
            const param = rules[rule];
            let msg;
            if( evaluate[rule].eval(value,param) ){
                msg = evaluate[rule].mess(fieldDisplay[name],param);
                err = [...err,msg];
            }
            return err;
        },[]
    )
}

const finalCheck = (arr) => arr.filter( e => e.length>0 ).pop();

export default function ValidationHandler ( Form ) {

    return class Handler extends Component {

        constructor(props){
            super(props);
            this.state = {
                form:this.props.form,
                errors:{}
            }
            this.changeText = this.changeText.bind(this);
            this.checkErrors = this.checkErrors.bind(this);
            this.submit = this.submit.bind(this);
        }

        checkErrors({value,name}){
            const errors = {},
                validation = this.props.validation,
                fieldDisplay = this.props.fieldDisplay;
            errors[name] = checkValue({value,name,validation,fieldDisplay});
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
            else
                this.props.submit(this.state.form);
        }

        render(){
            const {
                form,
                errors
            } = this.state
            return (
                <Form
                    {...this.props}
                    changeText={this.changeText}
                    form={form}
                    errors={errors}
                    submit={this.submit}/>
            )
        }
    }

}
