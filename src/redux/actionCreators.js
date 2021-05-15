import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient=(igtype) =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        payload:igtype
    }
}

export const removeIngredient=(igtype) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        payload:igtype
    }
}

export const updatePurchasable=() =>{
    return{
        type:actionTypes.UPDATE_PURCHASABLE,
        
    }
}

export const resetIngredient=() =>{
    return{
        type:actionTypes.RESET_INGREDIENT,
        
    }
}


export const loadOrders=(order) =>{
    return{
        type:actionTypes.LOAD_ORDERS,
        payload:order
    }
}

export const orderLoadFailed=() =>{
    return{
        type:actionTypes.ORDER_LOAD_FAIL
    }
}

export const fetchOrders=(token,userId)=>dispatch=>{
    const queryParams='&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-f94ea-default-rtdb.firebaseio.com/tasin_moni.json?auth='+token+queryParams)
    .then(response=>{
       dispatch(  loadOrders(response.data))
    })

    .catch((err) => {
        dispatch(orderLoadFailed())
    })
}