import React, {useState, useEffect} from 'react';
import './App.css';
import {sendPostRequest} from './AJAX.jsx';
import useAsyncFetch from './useAsyncFetch'; 
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function App() {
  const [view, updateView] = useState(false);

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
        <SeeMore display={view}/>
      </main>
    </div>
  );
}

function SeeMore(props) {
  let display = props.display;
  console.log(display);
  
  if (display) {  
    return (
      <div id="seeMore">
        <LakeDisplay/>
        <div className="tile">
           <p>
Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>  
        </div>       
      </div>);
  }
  else {
    return (<div></div>);
  }
}

function LakeChart(props) {
  let lakes = {
    "Shasta" : 4552000,
    "Oroville" : 3537577,
    "Trinity Lake" : 2447650,
    "New Melones" : 2400000,
    "San Luis" : 2041000,
    "Don Pedro" : 2030000,
    "Berryessa" : 1602000
  };
  
  const nicknames = new Map();
  let count = 0;
  for (let i in lakes) {
    nicknames.set(count, i);
    count++;
  }
  
  if (props.lakes) {
    let n = props.lakes.length;
    console.log(props.lakes);


    let capacity = {label: "capacity", data: [], backgroundColor: []};
    let storage = {label: "storage", data: [], backgroundColor: []};
    let labels = [];
    
    for (let i=0; i < n; i++) {
      let lake = nicknames.get(i);
      capacity.data.push(lake);
      storage.data.push(props.lakes[i].value);
      labels.push(lake);
    }
  console.log(storage.data);
    console.log(storage.data);
  let userData = {};
  userData.labels = labels;
  userData.datasets = [capacity, storage];

console.log(userData);
let options = {
  plugins: {
    title: {
      display: true,
      text: 'Sticker vs. Middle Income Family Prices',
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
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
function LakeDisplay() {
  console.log("in LakeDisplay");

  // static var will contain the list of schools
  const [lakes, setLake] = useState([]);

  // call the custom fetch hook, passing it the callback functions that it can use
  useAsyncFetch("/query/getLake", {}, thenFun, catchFun);
  
  function thenFun (result) {
    setLake(lakes);
    // render the list once we have it
  }

  function catchFun (error) {
    console.log(error);
  }

  // will re-render once state variable schools changes
  if (lakes) {
  return (
    <main>
      <LakeChart lakes={lakes}> </LakeChart>
    </main>
  )
  } else {
    return (<p>
      loading...
    </p>);
  }
}
export default App;