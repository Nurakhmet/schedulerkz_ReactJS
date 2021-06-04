import logo from './logo.svg';
import './App.css';
import UserProvider from "./Components/UserProvider";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router} from "react-router-dom";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useContext} from "react";
import UserContext from "./Components/UserCon";

function App() {
  let jwt = localStorage.getItem('jwtToken');

  const {userr,login,logout,profile} = useContext(UserContext);



  return (
      <div style={{ color: "#2D4059", fontFamily: "Montserrat", fontSize: "14pt"}}>
        <div className="container">

          <UserProvider>
            <Router>
              <Navbar currentUser={userr}/>
            </Router>

          </UserProvider>
        </div>
      </div>
  );
}

export default App;
