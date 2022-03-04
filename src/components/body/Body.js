import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import {connect} from "react-redux";
import Rooms from './Rooms';
import Checkout from './Checkout';
import Auth from '../Auth/Auth'
import Logout from '../Auth/Logout';
import { authCheck } from '../../redux/authActionCreators';


const mapStateToProps =(state)=>{
    return{
        token: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
        return {
        authCheck: () => dispatch(authCheck())
    }
}

class Body extends Component {

    componentDidMount(){
        this.props.authCheck()
    }
    
    render(){

        let routes = null;

    if(this.props.token === null)
    {
        routes= (
            <Switch>
                <Route path="/login" exact component={Auth} />
                <Redirect to="/login"/>
            </Switch>
        )
    }
    else{
        routes=(
            <Switch>
                <Route path="/checkout"  component={Checkout} />
                <Route path="/logout"  component={Logout} />
                <Route path="/rooms"  component={Rooms} />
                <Route path="/" exact component={Rooms} />
                <Redirect to="/"/>
            </Switch>
        )  
    }
    
    return (
        <div>
          {routes}
        </div>
    );
    }   
}

export default connect(mapStateToProps,mapDispatchToProps)(Body);