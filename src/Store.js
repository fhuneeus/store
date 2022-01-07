import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

export function Store(){
 
  const [listIncidents, setListIncidents] = useState([]);
  const [listOpenCases, setListOpenCases] = useState([]);
  const [listClosedCases, setListClosedCases] = useState([]);
  const [listOpenCasesBetween, setListOpenCasesBetween] = useState([]);
  const [listClosedCasesBetween, setListClosedCasesBetween] = useState([]);
  const [averageSolutionTimeBetween, setAverageSolutionTimeBetween] = useState(0);
  const [maxSolutionTimeBetween, setMaxSolutionTimeBetween] = useState(0);
  const [numOpenCasesBetween, setNumOpenCasesBetween] = useState(0);
  const [numClosedCasesBetween, setNumClosedCasesBetween] = useState(0);
  const [startDate, setStartDate] = useState("-");
  const [endDate, setEndDate] = useState("-");
  
  class Incident{
    
    constructor(descriptionText, status, date1, date2){

      this.state = {
        description : descriptionText,
        status: status,
        openDate: date1,
        closeDate: date2
      };

    }

  }

  const createIncident = () => {

    if((document.getElementById("firstdate").value)!="" && document.getElementById("seconddate").value!=""){

    let list = listIncidents;
    let opencases = listOpenCases;
    let closedcases = listClosedCases;
    let status = "";

    let description = document.getElementById("description").value;
    let fdate = new Date(document.getElementById("firstdate").value);
    let sdate = new Date(document.getElementById("seconddate").value);
    let today = new Date();
  
    if(sdate.getTime()<today.getTime()){
      status = "Closed";
    }
    else{
      status = "Open";
    }
    
    const newIncident = new Incident(description, status, fdate, sdate);

    list.push(newIncident);
    setListIncidents(list);

    if(status=="Open"){
      opencases.push(newIncident);
      setListOpenCases(opencases);
    }
    else{
      closedcases.push(newIncident);
      setListClosedCases(closedcases);
    }

    alert('Incident created succesfully');

  }

  else alert('Both start and end date must be valid values');

  }  

  const calculateIncidentDuration = (incident) => {

    return ((incident.state.closeDate.getTime()) - (incident.state.openDate.getTime()));

  }

  const averageSolutionTime = (closedCases) => {

    if(closedCases.length>0){

    let totalSolutionTime = 0;
    let averageSolutionTime = 0;

    for(let i=0; i<closedCases.length; i++){
      console.log("Iterating through closed case "+i);
      totalSolutionTime += calculateIncidentDuration(closedCases[i]);

      console.log("Current solution time is "+totalSolutionTime);

    }

    averageSolutionTime = totalSolutionTime/closedCases.length;
    return averageSolutionTime;

  }
}

  const maximumSolutionTime = (closedCases) =>{

    let maxSolutionTime = 0;

    for(let i=0; i<closedCases.length; i++){
      let solutionTime = calculateIncidentDuration(closedCases[i]);
      if(solutionTime > maxSolutionTime){
        maxSolutionTime = solutionTime;
      }
    }

    return maxSolutionTime;

  }

  const getOpenAndClosedCasesBetweenDates = (date1, date2) => {

    let numOpenCases = 0;
    let numClosedCases = 0;
    let listOpenBetween = listOpenCasesBetween;
    let listClosedBetween = listClosedCasesBetween;

    for(let i=0; i<listIncidents.length; i++){
      if((listIncidents[i].state.openDate.getTime() > date1.getTime()) && ((listIncidents[i].state.closeDate.getTime()>date2.getTime()) || listIncidents[i].closeDate=="")){
        numOpenCases++;
        listOpenBetween.push(listIncidents[i]);
      }
      else{
        numClosedCases++;
        listClosedBetween.push(listIncidents[i]);
        console.log(numClosedCases);
      }
    }

    setNumOpenCasesBetween(numOpenCases);
    setNumClosedCasesBetween(numClosedCases);
    setListClosedCasesBetween(listClosedBetween);
    setListOpenCasesBetween(listOpenBetween);

  }

  const incident_status = () =>{
    
    if(document.getElementById("firstDateQuery").value!="" && document.getElementById("secondDateQuery").value!=""){
    
    let date1 = new Date(document.getElementById("firstDateQuery").value);
    let date2 = new Date(document.getElementById("secondDateQuery").value);

    setStartDate(date1);
    setEndDate(date2);

    getOpenAndClosedCasesBetweenDates(date1,date2);

    let avgSolutionTime = averageSolutionTime(listClosedCasesBetween);
    let maxSolutionTime = maximumSolutionTime(listClosedCasesBetween);

    setAverageSolutionTimeBetween(avgSolutionTime);
    setMaxSolutionTimeBetween(maxSolutionTime);

    }

    else{
      alert('Both start and end date must be valid values');
    }

    }

  const displayDate = (date) => {
    return date.toString().substring(0,16);
  }
  
  
  return (
    <div id="completeContent">


    <label>1) Enter a description for the incident you want to create.</label><br/>
    <input type="text" id="description"></input><br/>

    <p>2) Enter a start and end date for the incident. If you choose a end date past today, the event will be Open.</p><br/>
    <input type="date" min="2021-01-04"  id="firstdate"></input>
    <input type="date" min="2021-01-04"  id="seconddate"></input>
    <button id="createIncident" onClick = {createIncident}>Create incident</button>

    <p>3) Select a starting date and a end date to check for open incidents, closed incidents, average completion time and maximum completion time</p><br/>
    <input type="date" min="2021-01-04"  id="firstDateQuery"></input>
    <input type="date" min="2021-01-04"  id="secondDateQuery"></input>
    <button id="checkStatus" onClick = {incident_status}>Check for open and closed cases, average and maximum completion time</button>

    <div>
        <p>Dates being checked are between {displayDate(startDate)} and {displayDate(endDate)}</p>
        <p id="numberOfOpenCases">Number of open cases is {numOpenCasesBetween}</p>
        <p id="numberOfClosedCases">Number of closed cases is {numClosedCasesBetween}</p><br/>

        <p id="averageSolutionTime">The average solution time for closed cases in this date range is {averageSolutionTimeBetween}</p>
        <p id="maximumSolutionTime">The maximum solution time for the closed cases in this range is {maxSolutionTimeBetween}</p>

      </div>

    </div>
  );

}

export default Store;

