import * as actionTypes from './actionTypes'


const INGREDIENT_PRICE={
    salad:20,
    cheese:40,
    meat:90
}

const INITIAL_STATE={
    ingredients:[
        {type:"salad", amount:0},
        {type:"cheese", amount:0},
        {type:"meat", amount:0},

    ] ,
    orders:[],
    ordersLoading:true,
    ordersError:false,
    totalPrice:80,
    purchasable:false,
    token:null,
    userId:null,
    authLoading:false,
    authFailedMsg:null
}

export const reducer=(state=INITIAL_STATE,action)=>{
    const ingredients=[...state.ingredients];
    switch(action.type){

        case actionTypes.ADD_INGREDIENT:
      
      for(let item of ingredients){
          if(item.type===action.payload){
            item.amount++;
          }
      }

      return{
          ...state,
          ingredients: ingredients,
          totalPrice:state.totalPrice+INGREDIENT_PRICE[action.payload]
      }
// Romove Functionality add 
     case actionTypes.REMOVE_INGREDIENT:
    
        for(let item of ingredients){
            if(item.type===action.payload){
                if(item.amount<=0) return state;
              item.amount--;
            }
        }

       return{
        ...state,
        ingredients: ingredients,
        totalPrice:state.totalPrice-INGREDIENT_PRICE[action.payload]
       }


       case actionTypes.UPDATE_PURCHASABLE:
         const sum=state.ingredients.reduce((sum,element)=>{
                return sum+element.amount;
         },0)
  return{
      ...state,
      purchasable:sum>0,
  }

  case actionTypes.RESET_INGREDIENT:
      return{
          ...state,
          ingredients:[
            {type:"salad", amount:0},
            {type:"cheese", amount:0},
            {type:"meat", amount:0},
    
        ] ,
        totalPrice:80,
        purchasable:false

      }

      case actionTypes.LOAD_ORDERS:
          const orders=[];
          for(let key in action.payload){
              orders.push({
              ...action.payload[key],
                  id:key
              })
          }

        //   console.log(orders)
          return{
              ...state,
              orders:orders,
              ordersLoading:false,
              
          }
          case actionTypes.ORDER_LOAD_FAIL:
              return{
                  ...state,
                  ordersError:true,
                  ordersLoading:false,
              }
            // Auth Reducing Logic
            case actionTypes.AUTH_SUCCESS:
            
                return{
                    ...state,
                    token:action.payload.token,
                    userId:action.payload.userId
                }

                case actionTypes.AUTH_LOGOUT:
                    return{
                        ...state,
                        token:null,
                        userId:null,
                        authFailedMsg:null
                    }
                    case actionTypes.AUTH_LOADING:
                        return{
                            ...state,
                            authLoading:action.payload
                        }
                        case actionTypes.AUTH_FAILED:
                            return{
                                ...state,
                                authFailedMsg:action.payload
                            }
        default:
            return state;
    }
}