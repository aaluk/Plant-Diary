import React, {useState} from 'react';
import moment from 'moment';
import axios from 'axios';

function PlantChore ({plant, active, updatePlants}) {
  const [checked, setChecked] = useState(plant.completed);

  const handleChange = () => {
    setChecked(true);
    let update = {
      id: plant.id,
      completed: true
    }
    let nextWater = moment().add(plant.waterFrequency, 'day');
    let newEvent = {
      name: plant.name,
      plantSpecies: plant.plantSpecies,
      waterFrequency: plant.waterFrequency,
      nextWater,
      completed: false
    }
    axios.put('/api/v1/events/update', update)
      .then ( () => axios.post('/api/v1/events/create', newEvent))
      .then ( () => updatePlants())
      .catch ( err => console.log(err))
    //create a put request to update the completed status
    //AND post request to make a new event
  }
  return (
    <div className={checked ? "plantChoreDone": "plantChore"}>
      <label>
        {active ?
          <input type="checkbox" checked={checked} onChange={handleChange}></input> :
          <input type="checkbox" disabled></input>
        }
        Water {plant.name}
      </label>
    </div>
  );
}

export default PlantChore;