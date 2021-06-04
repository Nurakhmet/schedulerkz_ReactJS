import 'materialize-css/dist/css/materialize.min.css';
import React, { useState, useEffect,useContext } from 'react';
import UserContext from './UserCon';

function Logout() {
    let jwt = localStorage.getItem('jwtToken');
    const user = useContext(UserContext);

    const handleLogChange = event =>{
        localStorage.removeItem("jwtToken");

        console.log(jwt);
    }

    return <a href = {`/`} className="nav-link" style={{color: "#2D4059"}} onClick = {handleLogChange}><i className="material-icons prefix right" style = {{color:'#2D4059'}} >logout</i> <strong>Log out</strong></a>
}

export default Logout;