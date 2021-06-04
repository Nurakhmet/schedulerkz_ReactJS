import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserCon';
import moment from 'moment'
import {Link} from "react-router-dom";




function AllSeacrhCards(props) {
    const { toSearchDateExp, deleteTasks} = props;
    const [dataSearch, setDataSearch] = useState([]);
    const [errorSearch, setErrorSearch] = useState("");
    console.log("GEtSearch", toSearchDateExp)

    async function loadSearchData() {
        debugger;
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getTaskByDate/"+toSearchDateExp, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":bearer,
            },
        });
        let DataSearch = await response.json();
        console.log(DataSearch);
        // setDataSearch(DataSearch);
        if (DataSearch.length != 0){
            setDataSearch(DataSearch);
        }else{
            setErrorSearch(toSearchDateExp)
        }
    }

    useEffect(() => {
        loadSearchData();
    }, [toSearchDateExp]);


    const cards1 = dataSearch.map((tasks,idx)=>(
        <div className="col-12" key={tasks}>
            <div className="card" style={{backgroundColor: "white", borderRadius: "20px"}}>
                <div className="card-content">
                    <h1 className="card-title"><strong>{tasks.taskText}</strong></h1>
                    <h5 className="card-title"><strong>User: {tasks.users.fullName}</strong></h5>
                    <h5>toDate: {moment(tasks.toDateExp).format("LL")} </h5>
                    <div className="switch">
                        <label>
                            Done
                            <input disabled type="checkbox" checked={tasks.done}/>
                            <span className="lever"></span>
                        </label>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="waves-effect waves-light ml-1 btn-small red" onClick={() => deleteTasks(tasks)} type="button"
                            name="action">DELETE
                    </button>
                    <Link className="waves-effect waves-light btn-small right"
                          style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/tasks/${tasks.id}`}  ><i
                        className="material-icons right">edit</i><strong>EDIT</strong></Link>
                </div>
            </div>
        </div>
    ));


    return (<div>
            {dataSearch.length!=0? <div className="mt-3"> <h3>Search result for: "{toSearchDateExp}"</h3><div className="row mt-1">{cards1}</div></div>:<div className="col-12"><h3>There is no task with  <strong> <i>{errorSearch}</i> </strong>date</h3></div>}
        </div>
    );
}

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
                    <button className="waves-effect waves-light ml-1 btn-small red" onClick={() => props.deleteTasks(props.tasks)} type="button"
                            name="action">DELETE
                    </button>
                    <Link className="waves-effect waves-light btn-small right"
                          style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/tasks/${props.tasks.id}`}  ><i
                        className="material-icons right">edit</i><strong>EDIT</strong></Link>

                </div>
            </div>
        </div>
    )
}

function Main(props) {

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.datepicker');
    //     var instances = M.Datepicker.init(elems, {});
    // });

    const [toSearchDateExp, setToSearchDateExp] = useState("");
    const [change,setChange] = useState(0);
    const [taskText, setTaskText] = useState("");
    const [toDateExp, setToDate] = useState("");
    const [done, setDone] = useState("");

    const soldCheckbox = ({ target: { checked } }) => {
        console.log(done, checked);
        setDone(checked);
    };

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

    const handleSearchToDateChange = event =>{
        setToSearchDateExp(event.target.value);
    }

    const handleCLearButton = event =>{
        setToSearchDateExp("");
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

    async function deleteTasks(data){
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        console.log(data);
        const response = await fetch("http://localhost:8000/api/deleteTask/"+data.id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        if(response.status==200){
            setChange(change+1);
        }
    }

    const [dat, setDat] = useState([]);

    // const handleSearchChange = event =>{
    //     setSearch(event.target.value);
    // }


    // const handleSearchSubmit = event =>{
    //     const
    // }

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

    // async function  editTask(data){
    //
    //     const bearer = "Bearer "+ localStorage.getItem('jwtToken');
    //
    //     const response = await fetch("http://localhost:8000/api/saveTasks", {
    //
    //         method: "PUT",
    //         mode: "cors",
    //         cache: "no-cache",
    //         credentials: "same-origin",
    //         headers: {
    //             "Authorization":bearer,
    //             "Content-Type": "application/json",
    //
    //         },
    //         redirect: "follow",
    //         referrerPolicy: "no-referrer",
    //         body: JSON.stringify(data)
    //     });
    //
    //     if(response.status==200){
    //         setChange(change+1);
    //         console.log("EDITED" + data);
    //     }else if (response.status==500){
    //         console.log("EDITED" + data.taskText);
    //     }
    // }

    async function loadDat() {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/allTasks",{
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

    // useEffect(() => {
    //     loadData();
    //     loadRestaurants();
    // }, [change]);
    useEffect(() => {
        loadDat();
    }, [change]);

    const task = dat?.map((tasks,idx)=>(
        <Card taskText={tasks.taskText} toDateExp={tasks.toDateExp} done={tasks.done} users={tasks.users} tasks={tasks} deleteTasks={deleteTasks} />
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
                <div className="col"><h5 >Search by date</h5></div>
                {/*<form onSubmit={handleSearchSubmit}>*/}
                <div className="card pb-5 pt-2" style={{backgroundColor: "white", borderRadius: "20px"}}>

                    {/*<div className="row">*/}
                        <div className="input-field col s12 pt-2">
                            <input id="day" type="date" value={toSearchDateExp} onChange={handleSearchToDateChange}
                                   className="form-control"/>
                            <label htmlFor="day">Date</label>
                        </div>
                    {/*</div>*/}
                    {/*<div className="row">*/}
                        <div className="input-field col s12 pt-2 pb-3">
                            <button className="btn waves-effect waves-light right mb-4 mt-4" onClick={handleCLearButton} type="submit">Clear
                                <i className="material-icons right">clear</i>
                            </button>
                        </div>
                    {/*</div>*/}
                </div>
                {/*    <div className="row">*/}
                {/*        <button className="btn waves-effect waves-light right mb-4" type="submit">Search*/}
                {/*            <i className="material-icons right">send</i>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</form>*/}

                {/*{search !== "" ? <AllSeacrhCards addToCart={props.addToCart} search={search}/> :*/}
                {/*    <div className="row">{dish}</div>*/}
                {/*}*/}
       {toSearchDateExp !== "" ? <AllSeacrhCards toSearchDateExp={toSearchDateExp} deleteTasks={deleteTasks} />:
                    <div className="row">{task}</div>
                }

            </div>
        </div>
    </div>
}

export default  Main;

