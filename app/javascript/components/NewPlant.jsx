import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';


function NewPlant ({setModal, updatePlants}) {
  const [name, setName] = useState('');
  const [plantSpecies, setPlant] = useState('');
  const [waterFrequency, setWater] = useState(0);
  const [startDate, setStart] = useState('');
  const [file, useFile] = useState(null);

  const clickHandler = () => {
    setModal(false);
  }

  let widget = window.cloudinary.createUploadWidget(
    {
    cloudName: 'dkx7ghwza',
    uploadPreset:'rwqy5jkq'
    },
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        if (result.event === 'success') {
          widget.close();
          useFile(result.info.secure_url)
        }
      }
    }
  )

  const showWidget = (widget) => {
    widget.open();
  }

  const uploadClickHandler = (e) => {
    e.preventDefault();
    widget.open();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let plantbody = {
      name,
      plantSpecies,
      waterFrequency,
      startDate,
      img: file
    }

    let nextWater = moment(startDate).add(waterFrequency, 'day');

    let eventbody = {
      name,
      plantSpecies,
      waterFrequency,
      nextWater,
      completed: false
    }
    axios.post('/api/v1/plants/create', plantbody)
      .then ( () =>
        axios.post('/api/v1/events/create', eventbody)
      )
      .then (result => {
        setModal(false)
        updatePlants();
      })
      .catch (err => {
        console.log(err)
      })

  }

  const nameChange = (e) => {
    setName(e.target.value);
  }

  const speciesChange = (e) => {
    setPlant(e.target.value);
  }

  const waterChange = (e) => {
    setWater(Number(e.target.value));
  }

  const dateChange = (e) => {
    setStart(e.target.value);
  }

  return (
    <div className="modal">
      <form className="form" onSubmit={submitHandler}>
        <div className="formHeader">
          <span><i className="fas fa-leaf"></i>Add A New Plant!</span>
          <i className="fas fa-times closeButton" onClick={clickHandler}></i>
        </div>
        <label>Name</label>
        <input onChange={nameChange} className="text" type="text" name="name" placeholder="Enter plant name... "></input>
        <label>Plant Species</label>
        <input onChange={speciesChange}className="text" type="text" name="plantSpecies" placeholder="Enter plant species..." required></input>
        <label>Water every <input onChange={waterChange} className="number" type="number" name="waterFrequency"required></input> day(s)</label>
        <label>Last Watered? <input onChange={dateChange} type="date" name="date" required></input></label>
        <button name="upload" onClick={uploadClickHandler} className="normalButton">Upload Photo</button>

        <input name="submit" className="submitButton" type="submit" name="submit!!"></input>
      </form>
    </div>
  )
}

export default NewPlant;