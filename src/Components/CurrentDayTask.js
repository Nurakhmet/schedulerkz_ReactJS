import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserCon';
import moment from 'moment'
import {Link} from "react-router-dom";



function Card(props){

    const [done, setDone] = useState("");

    // const handleDoneChange = event =>{
    //     setDone(event.target.value);
    // }

    const soldCheckbox = ({ target: { checked } }) => {
        console.log(done, checked);
        setDone(checked);
    };



    return (
        <div className="col-12" key={props.tasks}>
            <div className="card" style={{backgroundColor: "white", borderRadius: "20px"}}>
                <div className="card-content">
                            <h1 className="card-title"><strong>{props.taskText}</strong></h1>
                    <h5 className="card-title"><strong>User: {props.users.fullName}</strong></h5>
                    <h5>toDate: {moment(props.toDateExp).format("LL")} </h5>
                    <div className="switch">
                        <label>
                            Done
                            <input disabled type="checkbox" checked={props.done}/>
                            <span className="lever"></span>
                        </label>
                    </div>
                </div>
                <div className="card-footer">
                    <Link className="waves-effect waves-light btn-small right"
                          style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/tasks/${props.tasks.id}`}  ><i
                        className="material-icons right">edit</i><strong>EDIT</strong></Link>
                </div>
            </div>


        </div>
    )
}

function CurrentDayTask(props) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.datepicker');
        var instances = M.Datepicker.init(elems, {});
    });

    const [search, setSearch] = useState("");
    const [change,setChange] = useState(0);
    const [taskText, setTaskText] = useState("");
    const [toDateExp, setToDate] = useState("");

    const user = useContext(UserContext);
    let jwt = localStorage.getItem('jwtToken');
    if(jwt != null){

    }

    const handleTaskTextChange = event =>{
        setTaskText(event.target.value);
    }

    const handleToDateChange = event =>{
        setToDate(event.target.value);
    }

    async function addTask(data,id){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        const response = await fetch("http://localhost:8000/api/addTask", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization" : bearer,
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        let messData = await response.json();
        console.log(messData);
        // setNewId(messData.id);
        setChange(change+1);
    }



    const [dat, setDat] = useState([]);

    const handleSearchChange = event =>{
        setSearch(event.target.value);
    }


    const handleSubmit = event =>{

        // const toDate2 = {moment(toDate).format()}
        const inputData = {taskText,toDateExp,user}
        // console.log("input" + restaurants);
        // addDishes(inputData, restaurants);
        addTask(inputData);
        console.log("FROM HANDLE"+ inputData +" --" + user);
        setTaskText("");
        setToDate("");

        event.preventDefault();


    }

    async function loadDat() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getCurrentTask",{
                method: "GET",
                headers: {
                    "Authorization" : bearer,
                    "Content-Type" : "application/json"
                }
            }
        );
        let Data = await response.json();
        console.log(Data);
        setDat(Data);
    }

    useEffect(() => {
        loadDat();
    }, [change]);

    const task = dat?.map((tasks,idx)=>(
        <Card taskText={tasks.taskText} toDateExp={tasks.toDateExp} done={tasks.done} users={tasks.users} tasks={tasks} />
    ));


    return <div className = "container">
        <div className="card" style={{backgroundColor: "white", borderRadius: "20px"}}>
            <div className="col"><h5 >Create new Task</h5></div>
            <form className="col s12" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="text" type="text" value={taskText} onChange={handleTaskTextChange} className="validate"/>
                            <label htmlFor="text">Task Text</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="day" type="date" value={toDateExp} onChange={handleToDateChange} className="form-control"/>
                        <label htmlFor="day">Date</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light right mb-4" type="submit">Create
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>

        <div className = "row mt-3">
            <div className = "col-12 mt-3" style = {{paddingLeft:'0px',paddingRight:'0px'}}>

                    <div className="row">{task}</div>

            </div>
        </div>
    </div>
}

export default  CurrentDayTask;

