import React,{
    Component
} from 'react';
import {
    DisplayGrid,
    use
} from '../../../components/grid/DisplayGrid.jsx';
import {
    GridElement,
    COLUMNS
} from './GridElement.jsx';

import LoadingComponent from '../../../components/hocs/LoadingComponent.jsx';

export default class ShopForm extends Component {
    constructor(props){
        super(props);
        this.state={data:null}
    }

    componentDidMount(){
        this._ismounted = true;
        this.props.performRequest({
            options:{url:`/shop/list`},
            method:'get',
            successCallback: (res) => {
                if (this._ismounted)
                    this.setState({data:res.data})
            },
            errorCallback: err => console.log(err)
        })
    }

    componentWillUnmount(){
        this._ismounted = false;
    }

    render(){
        const props = this.props;
        return (
            <div className="container-fluid mvpadding aligncenter">
                <div className="row">
                    <h2 className="alignleft bolder">pizza hubs.</h2>
                </div>
                <div className="row" style={{paddingBottom:"15px"}}>
                    click on each shop to see its menu.
                </div>
                <LoadingComponent
                    data={this.state.data}>
                    {
                        DisplayGrid({
                            data:Object.values(this.state.data||{}),
                            extra:props.orderState,
                            GridElement,
                            colNum:COLUMNS
                        })
                    }
                </LoadingComponent>
            </div>
        )
    }

}
