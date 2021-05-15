import React,{Component} from 'react';
import {Formik} from 'formik';
import {auth} from '../../redux/authActionCreators';
import {connect} from 'react-redux'
import {Alert} from 'reactstrap'
import Spinner  from '../Spinner/Spinner'

const mapDispatchToProps =dispatch =>{
    return {
        auth: (email, password,mode)=>dispatch(auth(email, password,mode))
    }
}

const mapStateToProps =state =>{
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}


class Auth extends Component {
    state={
        mode:"Sign Up"
    }
    modeChange=()=>{
        this.setState({
            mode:this.state.mode==="Sign Up"? "Login":"Sign Up"
        })
    }
    render() {
        // console.log("AUTH: ",this.props.authLoading)
        let error=null

        if(this.props.authFailedMsg!==null){
            error=(<Alert color="danger">{this.props.authFailedMsg}</Alert>)
        }

        let form=null
        if(this.props.authLoading){
            form=(<Spinner />)
        }else{
            form=(

                <Formik
                initialValues={{
    
                    email:"",
                    password:"",
                   confirmPassword:""
                }}
                onSubmit={
                    (values)=>{
                     this.props.auth(values.email, values.password,this.state.mode)
                    }
                }
                validate={
                    (values)=>{
                        const errors={};
                        if(!values.email){
                            errors.email="Required";
                        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
                            errors.email="Invalid email";
                        }
    
                        if(!values.password){
                            errors.password="Required";
    
                        }else if(values.password.length<4){
                            errors.password="Password Must be At Least 4 Charcter "
                        }
                        if(this.state.mode==="Sign Up"){
                            if(!values.confirmPassword){
                                errors.confirmPassword="Required";
                            }else if(values.password!==values.confirmPassword){
                                errors.confirmPassword="Password Doesn`t Match. Please Try Again"
                            }
                        }
                       
                     // console.log("ERRORS: ",errors);
                        return errors;
    
                      
    
                    }
                }
                >
                    
                 {/* Middle     */}
                   {
                        ({values,handleChange,handleSubmit,errors} )=>(
                            <div style={{
                                border: "1px solid grey",
                                padding: "15px",
                                borderRadius: "5px"
                            }}>
                                <button onClick={this.modeChange} 
                                className="btn btn-lg" style={{
                                    width: "100%",
                                    backgroundColor:"#D70F64",
                                    color: "white"
                                }} >Switch to 
                                {this.state.mode==="Sign Up"?"Login":"Sign Up"}
    
                                </button><br/><br/>
                                
                                <form  onSubmit={handleSubmit} >
                                    <input name="email" 
                                    value={values.email}
                                    placeholder="Enter Your Email" 
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                    <span style={{color:"red"}}>  {errors.email}</span>
                                <br/>
                               
                                    <input 
                                    value={values.password}  
                                     name ="password"
                                      placeholder="Password"
                                       className="form-control"
                                       onChange={handleChange}
                                       />
                                  <span style={{color:"red"}}>  {errors.password}</span>
                                <br/>
                                    {this.state.mode==="Sign Up"?
                                     <div>
                                          <input
                                     name="confirmPassword" 
                                      value={values.confirmPassword} 
                                      placeholder="Confirm Your Password" 
                                      className="form-control"
                                      onChange={handleChange}
                                      />
                                     <span style={{color:"red"}}>  {errors.confirmPassword}</span>
                                <br/>
                                    </div>:null}
                                  
                                <button  type="submit" className="btn btn-success">{this.state.mode==="Sign Up"? "Sign Up":"Login"}</button>
    
                                </form>
                            </div>
                        )
                    }
    
                </Formik>

            )
        }
        return (
            <div>
            {error}
           {form}
            
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Auth);