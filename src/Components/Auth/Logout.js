import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../redux/authActionCreators'


const mapDispatchToProps =dispatch =>{
    return {
        logout:()=>dispatch(logout())
    }
}

class authLogout extends Component{
    componentDidMount(){
        this.props.logout()
    }
    render() {
        return (
            <Redirect to="/"/>
        )
    }
}

export default connect(null,mapDispatchToProps) (authLogout)