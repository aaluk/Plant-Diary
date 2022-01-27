import React, { useState } from 'react';
import PlantCard from './PlantCard.jsx';
import leftArrow from './imgs/arrow-gray-left.png'
import rightArrow from './imgs/arrow-gray-right.png'

function PlantCarousel ({plants, updatePlants}) {
  const [index, setIndex] = useState(0);
  const shownPlants = plants.slice(index, index + 4);
  const slideLeft = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    }
  };

  const slideRight = () => {
    if (index + 4 <= plants.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="BigCardContainer">
      <img className={index === 0 ? "unselectedArrow" : "arrow"} src={leftArrow} alt='' onClick={slideLeft}></img>
      {shownPlants.map(plant => <PlantCard updatePlants={updatePlants} key={plant.id} plant={plant}/>)}
      <img className={index === plants.length - 4 ? "unselectedArrow" : "arrow"} src={rightArrow} alt='' onClick={slideRight}></img>
    </div>
  );
}


export default PlantCarousel;