import React, {useState} from 'react';
import './App.css';

function App() {
  const [view, updateView] = useState(false);

  function seeAction() {
    updateView(!view);
  }

  
  return (
    <main>
      <div>
      <p>
      California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
      </p>
      <p>
California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
      </p>

      <button id="seeButton" onClick={seeAction}>Hello</button>
      </div>
      <div>
        <p>
Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
        </p>
      </div>
      <figure>
        <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
"/>
        <figcaption>
Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
        </figcaption>
      </figure>
      <seeMore display={view}></seeMore>
    </main>
  );
}

function seeMore(props) {
  let display = props.display;

  if (display) {    
    return (<div id="Red">1234</div>);
  }
  else {
    return (<div></div>);
  }
}

export default App;