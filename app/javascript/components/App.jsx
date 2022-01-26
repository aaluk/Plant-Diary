import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar.jsx';
import PlantCarousel from './PlantCarousel.jsx';
import MyPlantHeader from './MyPlantHeader.jsx';
import MyCalendar from './MyCalendar.jsx';
import ChoreList from './ChoreList.jsx';
import { plantData } from './lib/plant-data.js';
import { plantEvents } from './lib/plant-events.js';
import axios from 'axios';


function App() {
  const [plants, setPlants] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(()=> {
    updatePlants();
  }, []);

  const updatePlants = () => {
    axios.get('/api/v1/plants/index')
      .then( results => {
        setPlants(results.data);
        return axios.get('/api/v1/events/index')
      })
      .then ( results => {
        setEvents(results.data);
      })
      .catch( err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <MenuBar/>
      <div className="container">
        <div className="myPlants">
          <MyPlantHeader updatePlants={updatePlants}/>
          {plants ? <PlantCarousel plants={plants}/> : null}
        </div>
        <div className="calendarListContainer">
          <div className="calendarHeader">My Chores</div>
          <div className="calendarList">
            {events ? <MyCalendar plants={events}/> : null}
            {events ? <ChoreList updatePlants={updatePlants} plants={events}/> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
