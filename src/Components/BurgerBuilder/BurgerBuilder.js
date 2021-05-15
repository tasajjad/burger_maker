import React,{Component} from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import {Modal ,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap';
import Summary from './Summary/Summary';
import {connect} from 'react-redux';
import {addIngredient,removeIngredient,updatePurchasable} from '../../redux//actionCreators'

const mapStateToProps =props=>{

    return {
        ingredients:props.ingredients,
        purchasable:props.purchasable,
        totalPrice:props.totalPrice,
    }
}

const mapDispatchToProps =dispatch=>{
    return{
        addIngredient:(igtype)=>dispatch(addIngredient(igtype)),
        removeIngredient:igtype=>dispatch(removeIngredient(igtype)),
        updatePurchasable:()=>dispatch(updatePurchasable())
    }
}


 class BurgerBuilder extends Component{
    state={
        modalOpen:false,
    };



// Modal Open and Close Opton
    toggleModal =()=>{
       this.setState({
           modalOpen:!this.state.modalOpen
       })
    }
// adding Ingredints
    addIngredient=type=> {
        this.props.addIngredient(type);
        this.props.updatePurchasable()
    }
    // Remove Item 
    removeIngredient=type=>{
    this.props.removeIngredient(type);
    this.props.updatePurchasable()
    }

    handleCheckout=()=>{
        this.props.history.push("/checkout")
    }
    componentDidMount(){
       
     }

    render() {

        return (
            // this class are privding for responsive design pattern
         <div>
               <div className="d-flex flex-md-row flex-column">
               <Burger ingredients={this.props.ingredients}/>
               <Controls
               ingredientAdded={this.addIngredient}
               removeIngredient={this.removeIngredient}
               price={this.props.totalPrice}
               toggleModal={this.toggleModal}
               purchasable={this.props.purchasable}
               />
           </div>
           <Modal isOpen={this.state.modalOpen}>
             <ModalHeader>You Order Summary</ModalHeader>
             <ModalBody>
                 <h5>Total Price:{this.props.totalPrice.toFixed(0)} BDT</h5>
                 <Summary ingredients={this.props.ingredients}/>
             </ModalBody>
             <ModalFooter>
                 <Button  style={{backgroundColor:"#D70F64"}}  onClick={this.handleCheckout} >Continue to Checkout</Button>
                 <Button color="secondary" onClick={this.toggleModal} >Cancel</Button>
             </ModalFooter>
           </Modal>
         </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (BurgerBuilder)