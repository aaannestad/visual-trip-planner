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

function NewEventForm(){
  const [event, setEvent ] = useState({
    type: "event type"
  });
  
  const mutation = useMutation(formData => {
    return fetch(`/trips/${tripId}/events/new`, formData)
  }) //I suspect this has to go in the parent function

  // function onOk(value) { // this is for the timepicker
  //   console.log(moment(value[0]).format('MMMM Do YYYY'));
  // }

  const eventTypes = [
    'Event', 'Stay', 'Journey'
  ]

  const updateType = (type) => {
    setEvent(previousState => {return {...previousState, type: type}})
  }
  const onClick = ({key}) => {
    updateType(eventTypes[key]); //oddly this is taking effect *after* the console.log statement
    console.log(`Clicked on item ${event.type}`);
  };

  const menu = (
    <Menu onClick = {onClick}>
      <Menu.Item key="0">
        <p>{eventTypes[0]}</p>
      </Menu.Item>
      <Menu.Item key = "1">
        <p>{eventTypes[1]}</p>
      </Menu.Item>
      <Menu.Item key = "2">
        <p>{eventTypes[2]}</p>
      </Menu.Item>
    </Menu>
  );

  return(
    <div>
      <Dropdown overlay={menu} trigger={['click']} arrow>
        <Button>{event.type}</Button>
      </Dropdown>
      {event.type == eventTypes[1] &&
        <p>You've selected 'stay'.</p>
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
    console.log(`You confirmed ${this}`)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="make a new event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <NewEventForm/>
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