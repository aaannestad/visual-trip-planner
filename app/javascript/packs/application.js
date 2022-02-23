// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

require('jquery')
require('moment') // is this even necessary?

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider, useQuery, useMutation } from 'react-query'
import {Modal, Button, DatePicker, TimePicker, Dropdown, Menu, message} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment';

const queryClient = new QueryClient()

const EVENT_TYPES = [
  'choose type', 'Event', 'Stay', 'Journey'
]

function NewEventForm({onChangeEventType, eventType}){
  
  const mutation = useMutation(formData => {
    return fetch(`/trips/${tripId}/events/new`, formData)
  }) //I suspect this has to go in the parent function

  // function onOk(value) { // this is for the timepicker
  //   console.log(moment(value[0]).format('MMMM Do YYYY'));
  // }

  const menu = (
    <Menu>
      {EVENT_TYPES.map((eventType) => (
        <Menu.Item key={eventType} onClick={() => onChangeEventType(eventType)}>
          <p>{eventType}</p>
        </Menu.Item>
      ))}
    </Menu>
  );

  return(
    <div>
      <Dropdown overlay={menu} trigger={['click']} arrow>
        <Button>{`${eventType}`}</Button>
      </Dropdown>
      {eventType == EVENT_TYPES[1] &&
        <p>Placeholder event</p> 
        || eventType == EVENT_TYPES[2] &&
        <p>Placeholder stay</p>
        || eventType == EVENT_TYPES[3] &&
        <p>Placeholder journey</p>
      }
    </div>
  )
}

function CalendarApp() {
  
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(`/trips/${tripId}/api.json`).then((res) => res.json() )
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(`You confirmed ${event}`)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [event, setEvent] = useState({
    type: EVENT_TYPES[0]
  })

  const updateEventType = (type) => {
    setEvent(state => {return {...state, type: type}})
  }

  return (
    <>
      <Modal title="make a new event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <NewEventForm
          eventType = {event.type}
          onChangeEventType = {(eventType) =>{
            updateEventType(eventType)
          }}
        />
      </Modal>
    <div>
      {isLoading && <h1>loading data</h1>}
      {!isLoading && (
       <FullCalendar
         plugins={[ timeGridPlugin ]}
          initialView="timeGrid"
         visibleRange={{start: data.start_date, end: data.end_date}}
         events={`/trips/${tripId}/events.json`}

         customButtons={{
          newEventButton: {
            text: 'new event',
            click: () => { showModal(); }
          }
         }}
        headerToolbar={{start: 'title', end: 'newEventButton'}}
        />
      )}
      </div>
      </>
    )
}

document.addEventListener('DOMContentLoaded', () => {
  const domContainer = document.querySelector('#fullcalendar');
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <CalendarApp/>
    </QueryClientProvider>,
    domContainer,
  );
})

// function loadCalendar() {
//   var calendarEl = document.getElementById('calendar');
//   var calendarData = document.getElementById('calendar_data');
//   var calendar = new Calendar(calendarEl, {
//     plugins: [timeGridPlugin],
//     initialView: 'timeGrid',
//       visibleRange: {
//         start: calendarData.dataset.startDate,
//         end: calendarData.dataset.endDate
//       },
//     events: `/trips/${tripId}/events.json`,
//     eventClick : function(info) {
//       var eventObj = info.event;
//       window.location = `/trips/${tripId}/events/${eventObj.id}/edit`
//     }
//   });
//   console.log(calendarData.dataset.startDate); //see what's in this element
//   calendar.render();
// };

// $(document).on('turbolinks:load', loadCalendar);