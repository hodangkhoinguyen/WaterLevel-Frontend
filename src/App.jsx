import React, {useState, useEffect} from 'react';
import './App.css';
import {sendPostRequest} from './AJAX.jsx';
import useAsyncFetch from './useAsyncFetch'; 
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import MonthYearPicker from 'react-month-year-picker';

function App() {
  const [view, updateView] = useState(false);
  const [date, setDate] = useState({month: 4, year: 2022});
  
  function yearChange(newYear) {
      setDate({year: newYear, month: date.month });
      let textBtn = document.getElementById("monthBtn");
      textBtn.textContent = displayDate(date);
    }

  function monthChange(newMonth){
      setDate({month: newMonth, year:date.year});
      let textBtn = document.getElementById("monthBtn");
      textBtn.textContent = displayDate(date);
    }
  
  function seeAction() {    
    let btn = document.getElementById("seeButton");
    if (view) {
      btn.textContent = "See more";
    }
    else {
      btn.textContent = "See less";
    }
    updateView(!view);
  }

  
  return (
    <div className="container"> 
      <hr id="stripe"></hr>
      <main>
        <div id="title">
          <h1>Water storage in California reservoirs</h1>
        </div>
        <div className="available">
          <div className="tile" id="tile1">
            <p>
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
            </p>
            <p>
      California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </p>
            <button id="seeButton" onClick={seeAction}>See more</button>
          </div>
          <div className="tile" id="tile2">
            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg"/>
            <figcaption>
    Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
            </figcaption>
          </div>
        </div>
        <SeeMore 
          display={view}
          date = {date}
          yearFun = {yearChange}
          monthFun = {monthChange}
        />
      </main>
    </div>
  );
}

function SeeMore(props) {
  let display = props.display;

  useEffect(()=>{console.log("render")}, [props.date]);
  const [view, updateView] = useState(false);

  function monthBtn() {
    updateView(!view);
  }

  let currDate = displayDate(props.date);
  
  if (display) {  
    return (
      <div className="seeMore">
        <LakeDisplay date = {props.date}/>
        <div className="tile" id="tile4">
           <p>
Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
          <div id="changeDate">
            <label>Change month</label>
            <div id="monthBtn" onClick={monthBtn}>{currDate}</div>
          </div>
          <MonthPicker
            view = {view}
            date = {props.date}
            yearFun = {props.yearFun}
            monthFun = {props.monthFun}/>
        </div>       
      </div>);
  }
  else {
    return (<div></div>);
  }
}

function MonthPicker(props) {
  let date = props.date;
  useEffect(()=>{console.log(date)}, [date]);
  
  function pickedYear (year) {
    props.yearFun(year);
  }
  
  function pickedMonth (month) {
    props.monthFun(month);
  }

  if (props.view) {
    return (
      <div id="monthDiv">
        <MonthYearPicker
          caption=""
          selectedMonth={date.month}
          selectedYear={date.year}
          minYear={2000}
          maxYear={2022}
          onChangeYear = {pickedYear}
          onChangeMonth = {pickedMonth}
        />
      </div> );
  }
  else {
    return (
      <div></div>
    )
  }
}

function LakeChart(props) {  
  if (props.lakes) {
    let n = props.lakes.length;

    let capacity = {label: "capacity", data: [4552000,3537577,2447650,2400000,2041000,2030000,1602000], backgroundColor: ['rgb(120,199,227)']};
    let storage = {label: "storage", data: [], backgroundColor: ['rgb(66,145,152)']};
    let labels = ["Shasta", "Oroville", "Trinity Lake", "New Melones", "San Luis", "Don Pedro", "Berryessa"];
    
    for (let i=0; i < n; i++) {
     // let lake = nicknames.get(i);
      //capacity.data.push(lake);
      capacity.data[i] /= 100000; 
      if (props.lakes[i] < 0) 
        storage.data.push(0);
      else
        storage.data.push(props.lakes[i] / 100000);
     // labels.push(lake);
    }
  let userData = {};
  userData.labels = labels;
  userData.datasets = [storage, capacity];

let options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};


      return (
        <div id="chart-container">
          <Bar options={options} data={userData} />
        </div>
      )
  }
}

// A component that fetches its own data
function LakeDisplay(props) {
  console.log("in LakeDisplay");
  // static var will contain the list of schools
  const [lakes, setLake] = useState([]);
  let date = props.date;
  
  useAsyncFetch("/query/getLake", date, thenFun, catchFun);
  
  // useEffect(()=> {
  //   useAsyncFetch("/query/getLake", {}, thenFun, catchFun);
  // } , [props.date]);
  
  function thenFun (result) {
    setLake(result);
    // render the list once we have it
  }

  function catchFun (error) {
    console.log(error);
  }

  // will re-render once state variable schools changes
  if (lakes) {
  return (
    <main id="tile3">
      <LakeChart lakes={lakes}> </LakeChart>
    </main>
  )
  } else {
    return (<p>
      loading...
    </p>);
  }
}

function displayDate(currDate) {
  let month = "";
  switch(currDate.month) {
    case 1: month = "January"; break;
    case 2: month = "February"; break;
    case 3: month = "March"; break;
    case 4: month = "April"; break;
    case 5: month = "May"; break;
    case 6: month = "June"; break;
    case 7: month = "July"; break;
    case 8: month = "August"; break;
    case 9: month = "September"; break;
    case 10: month = "October"; break;
    case 11: month = "November"; break;
    default: month = "December"; break;
  }

  return month + " " + String(currDate.year);
}
export default App;