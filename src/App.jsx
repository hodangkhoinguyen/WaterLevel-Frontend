import React, {useState, useEffect} from 'react';
import './App.css';
import {sendPostRequest} from './AJAX.jsx';

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
  
  function getChart() {
    (async function () {
      console.log("Doing AJAX request");
      let date = {"month": "1", "year": "2017"};
      let newMovies = await sendPostRequest("/query/getChart", date);
    }) ();
  }
  
  if (display) {  
    useEffect(getChart, []);
    return (
      <div id="seeMore">
        <div id="chart"></div>
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

export default App;