import React from 'react';
import axios from 'axios';

function PlantCard ({plant, updatePlants}) {
  const plantPhoto = plant.img || 'https://st4.depositphotos.com/33004860/39275/i/450/depositphotos_392750726-stock-photo-cartoon-green-plant-pot-houseplant.jpg'

  const clickHandler = () => {
    axios.delete(`/api/v1/plants/destroy?id=${plant.id}&name=${plant.name}&plantSpecies=${plant.plantSpecies}`)
      .then(results => updatePlants())
      .catch(err => console.log(err));
  }

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="card">
          <img src={plantPhoto} alt=''></img>
        </div>
        <div className="card-back">
          <div>
            <p><b>Name: </b>{plant.name}</p>
            <p><b>Species: </b>{plant.plantSpecies}</p>
            <p><b>Water Frequency: </b>Every {plant.waterFrequency} days</p>
            <p><b>Fertilize Frequency: </b> Every {plant.fertilizeFrequency} months</p>
          </div>
          <button onClick={clickHandler}>Delete</button>
        </div>

      </div>

    </div>
  );
}

export default PlantCard;