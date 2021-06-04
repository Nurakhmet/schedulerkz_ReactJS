import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;

import React, { useState, useEffect } from 'react';


function Register(params) {


    const [email, setEmail] = useState("");
    const [fullName,setFullname] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");


    // const handleAddrTypeChange = (e) => console.log((type[e.target.value]))

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }
    const handleFullNameChange = event =>{
        setFullname(event.target.value);
    }
    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }
    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
    }

    const handleSubmit = event =>{
        debugger;
        const inputData = {email, password,fullName};
        console.log(inputData);
        if(password == rePassword){
                addUser(inputData);

                setFullname("");
                setEmail("");

                setPassword("");
                setRePassword("");

        }else{
            setRePassword("");
            setPassword("");
        }

        event.preventDefault();
    }

    async function addUser(data){
        let jwt = localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                //     "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    }

    return <div>
        <div className="row" style = {{marginTop:'60px'}}>
            <form onSubmit = {handleSubmit} className="col-6 offset-3" style={{ borderRadius: "20px"}}>
                <div className="row px-4 py-4">
                    <h5 className="m-auto">Create new Account</h5>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>account_circle</i>
                        <input id="icon_prefix_name" type="text" className="validate" value = {fullName} onChange = {handleFullNameChange}/>
                        <label htmlFor="icon_prefix_name">Full Name</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>email</i>
                        <input id="icon_prefix_email" type="text" className="validate" value = {email} onChange = {handleEmailChange}/>
                        <label htmlFor="icon_prefix_email">Email</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                        <input id="icon_prefix_password" type="password" className="validate" value = {password} onChange = {handlePasswordChange}/>
                        <label htmlFor="icon_prefix_password">Password</label>
                    </div>
                </div>
                <div className="row px-2">
                    <div className="input-field col s12">
                        <i className="material-icons prefix" style = {{color:"#2D4059"}}>lock</i>
                        <input id="icon_prefix" type="password" className="validate" value = {rePassword} onChange = {handleRePasswordChange}/>
                        <label htmlFor="icon_prefix">Re-write password</label>
                    </div>
                </div>
                <div className="row px-4">
                    <button className="btn-small waves-effect waves-light" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit"

                    > <strong>Sign Up</strong> <i class="material-icons right">send</i></button>
                </div>
            </form>
        </div>
    </div>
}

export default Register;