import React, { useState } from 'react';
import NewPlant from './NewPlant.jsx';

function MyPlantHeader(props) {
  const [modal, setModal] = useState(false);
  const clickHandler = () => {
    setModal(true);
  }
  return (
    <div className="myPlantHeader">
      <div>
        My Plants
      </div>
      <i className="fas fa-plus" onClick={clickHandler}></i>
      {modal ? <NewPlant updatePlants={props.updatePlants} setModal={setModal}/> : null}
    </div>
  )
}

export default MyPlantHeader;