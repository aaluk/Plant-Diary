import React from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import './calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = ({plants}) => {
  let waterEvents = plants.map((plant) => {
    if (plant.completed === false) {
      return (
        {
          start: moment(plant.nextWater),
          end: moment(plant.nextWater),
          title: `${plant.name}`
        }
      );
    } else {
      return;
    }
  })
  return (
    <Calendar className="calendar"
      localizer={localizer}
      views = {['month']}
      defaultView="month"
      events={waterEvents}
      startAccessor="start"
      endAccessor="end"
      style={{height:500, width:'70%'}}
      />
  )
}

export default MyCalendar;