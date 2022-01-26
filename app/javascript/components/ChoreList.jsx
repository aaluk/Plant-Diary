import React from 'react';
import moment from 'moment';
import PlantChore from './PlantChore.jsx';

function ChoreList ({plants, updatePlants}) {
  const currentDate = moment();
  const nextDate = moment().add(1, 'day');

  return (
    <div className="choreList">
      <div className="choreheader">Plant To Dos</div>
      <div className="day">
        Today
        {plants.map(plant => {
          if(currentDate >= moment(plant.nextWater) && plant.completed === false || currentDate.format('MMMM Do YYYY') === moment(plant.nextWater).format('MMMM Do YYYY')){
            return <PlantChore updatePlants={updatePlants} key={plant.id} plant={plant} active={true}/>
          } else {
            return null;
          }
        })}
      </div>
      <div className="day">
        Tomorrow
        {plants.map(plant => {
          if(nextDate.format('MMMM Do YYYY') === moment(plant.nextWater).format('MMMM Do YYYY')){
            return <PlantChore key={plant.id} plant={plant} active={false}/>
          } else {
            return null;
          }
        })}
      </div>
      <div className="day">
        Upcoming
        {plants.map(plant => {
          if(nextDate < moment(plant.nextWater)){
            return <PlantChore key={plant.id} plant={plant} active={false}/>
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default ChoreList;