import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css' ;
import React, { useState, useEffect,useContext } from 'react';
// import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';
import { render } from '@testing-library/react';
import UserContext from './UserCon';
import moment from 'moment'
import {Link, Redirect, useParams} from "react-router-dom";



// function Card(props){
//
//     const [done, setDone] = useState("");
//
//     // const handleDoneChange = event =>{
//     //     setDone(event.target.value);
//     // }
//
//     const soldCheckbox = ({ target: { checked } }) => {
//         console.log(done, checked);
//         setDone(checked);
//     };
//
//
//
//     return (
//         <div className="col-12" key={props.tasks}>
//             <div className="card" style={{backgroundColor: "white", borderRadius: "20px"}}>
//                 <div className="card-content">
//                     <h1 className="card-title"><strong>{props.taskText}</strong></h1>
//                     <h5 className="card-title"><strong>User: {props.users.fullName}</strong></h5>
//                     <h5>toDate: {moment(props.toDate).format("LL")} </h5>
//                     {/*<h5>toDate: {props.toDate}</h5>*/}
//                     {/*<p>{props.done ? <h5>Yes</h5> : <h5>No</h5>}</p>*/}
//                     {/*<div className="switch"><label>Off<input type="checkbox" checked/>*/}
//                     {/*    <span className="lever"></span>On</label></div>*/}
//                     {/*<div className="switch">*/}
//                     {/*    /!*<form onChange={}>*!/*/}
//                     {/*    <label>*/}
//                     {/*        Off*/}
//                     {/*        <input type="checkbox" checked={props.done} value={done} onChange={handleDoneChange}/>*/}
//                     {/*            <span className="lever"></span>*/}
//                     {/*            On*/}
//                     {/*    </label>*/}
//                     {/*    /!*</form>*!/*/}
//                     {/*</div>*/}
//                     <div className="switch">
//                         <label>
//                             Done
//                             <input disabled type="checkbox" checked={props.done} onChange = {soldCheckbox}/>
//                             <span className="lever"></span>
//                         </label>
//                     </div>
//                 </div>
//                 <div className="card-footer">
//                     <Link className="waves-effect waves-light btn-small right"
//                           style={{backgroundColor: "#2D4059", color: "#FFD460"}} to={`/task/${props.tasks.id}`}  ><i
//                         className="material-icons right">edit</i> <strong>EDIT</strong></Link>
//                 </div>
//             </div>
//
//
//         </div>
//     )
// }

function Main(params) {
    let {taskId} = useParams();


    const [tasks, setTasks]= useState({id:0, taskText:"",done:false,toDateExp:""});
    const [change,setChange] = useState(0);
    const [taskText, setTaskText] = useState("");
    const [toDateExp, setToDate] = useState("");
    const [done, setDone] = useState(false);
    const [id, setId] = useState(0);


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


    const soldCheckbox = ({ target: { checked } }) => {
        console.log(done, checked);
        setDone(checked);
    };



    const [data, setData] = useState([]);



    const handleSubmit = event =>{

        // const toDate2 = {moment(toDate).format()}
        const inputData = {id,taskText,toDateExp,done}

        editTask(inputData);
        console.log("FROM HANDLE"+ inputData);

        event.preventDefault();

    }


    async function editTask(data){

        const bearer = "Bearer "+ localStorage.getItem('jwtToken');

        const response = await fetch("http://localhost:8000/api/saveTasks", {

            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Authorization":bearer,
                "Content-Type": "application/json",

            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        if(response.status==200){
            setChange(change+1);


        }



    }

    async function loadData(taskId) {
        const bearer = "Bearer "+ localStorage.getItem('jwtToken');
        let response = await fetch("http://localhost:8000/api/getTask/"+taskId,{
                method: "GET",
                headers: {
                    "Authorization" : bearer,
                    "Content-Type" : "application/json"
                }
            }
        );
        let Data = await response.json();
        console.log(Data);
        setData(Data);
        setTaskText(Data.taskText);
        setToDate(Data.toDateExp);
        setDone(Data.done);
        setId(Data.id);
        console.log(moment(data.toDateExp).format("DD.MM.yyyy"));
    }

    useEffect(() => {
        loadData(taskId);
    }, [change]);



    return <div className = "container">
        <div className="card" style={{backgroundColor: "white", borderRadius: "20px"}}>
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
                <div className="row">
                    <div className="input-field col s12">
                        <div className="switch">
                            <label>
                                Done
                                <input type="checkbox" checked={done} onChange = {soldCheckbox} />
                                <span className="lever"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <button className="btn waves-effect waves-light right mb-4" type="submit" >Update
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>

        <div className = "row mt-3">
            <div className = "col-12 mt-3" style = {{paddingLeft:'0px',paddingRight:'0px'}}>
                {/*<form>*/}
                {/*    <div className="row">*/}
                {/*        <div className="row"></div>*/}
                {/*        <div className="input-field col s12">*/}
                {/*            <i className="material-icons prefix">search</i>*/}
                {/*            <textarea id="icon_prefix2" onChange={handleSearchChange} className="materialize-textarea"></textarea>*/}
                {/*            <label htmlFor="icon_prefix2">Search</label>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</form>*/}

                {/*{search !== "" ? <AllSeacrhCards addToCart={props.addToCart} search={search}/> :*/}
                {/*    <div className="row">{dish}</div>*/}
                {/*}*/}
                {/*{search !== "" ? <div></div>:*/}
                {/*    <div className="row">{task}</div>*/}
                {/*}*/}

            </div>
        </div>
    </div>
}

export default  Main;

