import * as actionTypes from './actionTypes.js';
import axios from 'axios';


export const authSuccess=(token,userId) =>{
    // console.log("Token: ",token)
    // console.log("localId",userId)
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            userId:userId
        }
    } 
}

export const authFailed=errorMsg =>{
    return{
        type:actionTypes.AUTH_FAILED,
        payload:errorMsg
    }
}

export const authLoading=isLoading=>{
    return{
        type:actionTypes.AUTH_LOADING,
        payload:isLoading
    }
}

export const auth=(email, password,mode)=>dispatch=>{
    dispatch(authLoading(true))
    const authData={
        email: email,
        password: password,
        returnSecureToken:true
    }

    let authUrl = null;
    if(mode==="Sign Up"){
        authUrl ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    }else{
        authUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }


    const API_KEY="AIzaSyBTJSYmBlxs3MCeU2ecRO-xHrML7a888IQ";
    axios.post(authUrl+API_KEY,authData)
    .then(response=>{
//  console.log("Auth: ",response)
        dispatch(authLoading(false))
        localStorage.setItem('token',response.data.idToken);
        localStorage.setItem('userId',response.data.localId);
        let expirationTime=new Date(new Date().getTime()+response.data.expiresIn*1000)
        localStorage.setItem('expirationTime',expirationTime);
        dispatch(authSuccess(response.data.idToken,response.data.localId))
    })
    .catch((error) => {
        dispatch(authFailed(error.response.data.error.message))
        dispatch(authLoading(false))
    })
    
   

}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheck=()=>dispatch=>{
    const token=localStorage.getItem('token');
    if(!token){
        // Logout
        dispatch(logout())
    }else{
        const expirationTime=new Date(localStorage.getItem('expirationTime'))
        if(expirationTime<= new Date()){
            // Logut
            dispatch(logout())
        }
        else{
            const userId=localStorage.getItem('userId');
            dispatch(authSuccess(token,userId))
        }

    }
}
