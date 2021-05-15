import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchOrders} from '../../redux/actionCreators';
import Order from './Order/Order.js';
import Spinner from '../Spinner/Spinner.js'

const mapStateToProps =(state) =>{
    return {
        orders: state.orders,
        ordersLoading:state.ordersLoading,
        ordersError:state.ordersError,
        token:state.token, 
        userId:state.userId
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        fetchOrders:(token,userId)=>dispatch(fetchOrders(token,userId))
    }
}

class Orders extends Component {



    componentDidMount(){
        this.props.fetchOrders(this.props.token,this.props.userId)
    }

    componentDidUpdate(){
        // console.log(this.props)
    }
   
    render(){

       

        let orders=null;

        if(this.props.ordersError){
            orders=<p style={{
                border:"1px solid grey", 
                boxShadow:"1px 1px #888888", 
                borderRadius:"5px", 
                padding:"20px", 
                marginBottom:"10px"
            }}>Sorry Failed to Load Orders ! </p>
        }else{
            if(this.props.orders.length===0){
                orders=<p style={{
                    border:"1px solid grey", 
                    boxShadow:"1px 1px #888888", 
                    borderRadius:"5px", 
                    padding:"20px", 
                    marginBottom:"10px"
                }}>Sorry You Have No any Orders  ! </p>

            }else{
                orders=this.props.orders.map(orders=>{
                    return  <Order order={orders} key={orders.id} />
                   })
            }
            
        }

      
        return (
            <div>
              {this.props.ordersLoading?<Spinner/>:orders}
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Orders)