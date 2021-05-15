/* eslint-disable no-lone-blocks */
import React,{Component} from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
import Auth from './Auth/Auth'
import {connect} from 'react-redux';
import {authCheck} from '../redux/authActionCreators';
import Logout from './Auth/Logout'

const mapDispatchToProps =dispatch =>{
    return {
        authCheck:()=>dispatch(authCheck())
    }
}

const mapStateToProps =state=>{
    return {
        token: state.token
    }
}

class Main extends Component {

    componentDidMount(){
        this.props.authCheck()
    }

    render(){
           // console.log("Main: ",props.token)

    let routes=null
    if(this.props.token===null){
        routes=(
            <Switch>
                <Route path="/login" component={Auth}/>
                <Redirect to="/login"/>
            </Switch>
        )
    }else{
        routes=(
            <Switch>
                <Route path="/orders" component={Orders}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" exact  component={BurgerBuilder}/>
            <Route path="/logout" component={Logout}/>
            <Redirect to="/"/>
            </Switch>
        )
    }
    return (
        <div>
            <Header/>
            <div className="container">
            {routes}
            </div>
          
        </div>
    );
     
    }
 
}

export default connect(mapStateToProps,mapDispatchToProps) (Main);