import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect ,useContext} from 'react';
import UserContext from './UserCon';
// import {Alert} from "react-bootstrap";

function Profile(params) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems, {});
    });

    let jwt = localStorage.getItem('jwtToken');
    const {user,login,logout,profile} = useContext(UserContext);
    const [id, setId] = useState(user.id);
    const [fullName, setFullName] = useState(user.fullName);
    const [password, setPassword] = useState("");

    useEffect(()=>{
        profile();

        //   getUser(user.email);
    },[]);

    M.updateTextFields();

    const handleNameChange = event =>{
        login(user.id,user.email,event.target.value);

    }



    async function setData(data) {
        setId(user.id);
        setFullName(user.fullName);

        console.log(fullName);
        console.log(password);
    }

    const handleSubmit = event =>{
        console.log(fullName);
        const inputData = {
            id:user.id,
            email:user.email,
            fullName:user.fullName,
        };
        console.log(inputData);
        saveUser(inputData);

        event.preventDefault();

    }
    async function saveUser(data){
        console.log(data);
        const response = await fetch("http://localhost:8000/api/updateProfile", {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " +  jwt,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.text();


    }
    return <div>
        <div className="container">
            <div class="row" style = {{marginTop:'40px'}}>

                <form onSubmit = {handleSubmit} className="col-12" style={{borderRadius: "20px"}}>

                    <div className="row px-4 pt-4 pb-2 mb-2">
                        <h5 className="m-auto">Update Profile</h5>
                    </div>

                    <div class="row px-2">
                        <div class="input-field col s12">
                            <i class="material-icons prefix" style = {{color:"#2D4059"}}>email</i>
                            <input id="icon_prefix_email" style={{color: 'gray'}} type="text" className=" validate"  value = {user.email} readOnly/>
                            <label  class="active" for="icon_prefix_email">Email</label>
                        </div>
                    </div>
                    <div class="row px-2">
                        <div class="input-field col s12">
                            <i class="material-icons prefix" style = {{color:"#2D4059"}}>account_circle</i>
                            <input id="icon_prefix_name" type="text" className=" validate" value = {user.fullName} onChange = {handleNameChange}/>
                            <label  class="active" for="icon_prefix_name">Full Name</label>
                        </div>
                    </div>


                    <div class="row px-4">
                        <button className="btn-small waves-effect waves-light" style = {{backgroundColor:"#2D4059", color: "#FFD460"}} type="submit" > <strong>UPDATE PROFILE</strong>< i class="material-icons right">refresh</i></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

export default Profile;