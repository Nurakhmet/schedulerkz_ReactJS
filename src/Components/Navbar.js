import React, { useState,useContext,useEffect} from 'react';
import './../bootstrap/css/bootstrap.min.css';
import UserContext from './UserCon';
// import Logout from "./Logout";
import Profile from "./Profile";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Main from "./Main";
import TaskDetails from "./TaskDetails";
import CurrentDayTask from "./CurrentDayTask";
// import Tools from "./Tools";








function Navbar({currentUser}){


    const {user,login,logout,profile} = useContext(UserContext);




    useEffect(()=>{
        profile();
    },[]);

    return(
        <div>

            <div className="navbar navbar-expand-lg" style={{fontFamily: "Montserrat"}}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href={`/`} className="nav-link" style ={{fontSize: '30px', fontFamily: "Montserrat",color: "#2D4059"}}> <strong>Dastarkhan</strong> </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/`}> <strong>All Tasks</strong></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" style={{color: "#2D4059"}} href={`/currentDayTask`}> <strong>Current day Task</strong></a>
                        </li>
                    </ul>
                    <ul className="navbar-nav right">
                        {user.roles[0].role == "ROLE_ADMIN" ?
                            <li className="nav-item">
                                {user.auth?<a className="nav-link" style={{color: "#2D4059"}} href={`/tools`}> <strong>Tools</strong></a>:""}
                            </li>
                            :
                            ""
                        }
                        <li className="nav-item">
                            {user.auth?<a className="nav-link" style={{color: "#2D4059"}}  href={`/profile`}> <strong>{user.fullName}</strong></a>:<a className="nav-link" style={{color: "#2D4059"}} href={`/register`}>
                                <strong>Register</strong>
                            </a>}
                        </li>
                        <li className="nav-item">
                            {user.auth?<Logout/>:<a className="nav-link" style={{color: "#2d4059"}} href={`/login`}> <strong>Login</strong> </a>}
                        </li>
                    </ul>
                </div>
            </div>
            <Switch>

                {/*<Route path = "/tools">*/}
                {/*    <Tools/>*/}
                {/*</Route>*/}
                <Route path = "/register">
                    <Register  />
                </Route>
                <Route path = "/login">
                    {user.auth?<Redirect to = "/profile"/>:<Login/> }
                </Route>
                <Route path = "/profile">
                    <Profile/>
                </Route>
                <Route path = "/tasks/:taskId">
                    <TaskDetails/>
                </Route>
                currentDayTask
                <Route path = "/currentDayTask">
                    <CurrentDayTask />
                </Route>
                <Route path = "/">
                    <Main />
                </Route>


            </Switch>
            <div className="row" style={{height: "50px"}}></div>
        </div>
    )

}
export default Navbar;