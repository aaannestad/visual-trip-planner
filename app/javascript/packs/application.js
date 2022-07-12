// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

require("jquery");
require("moment"); // is this even necessary?

import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import {
  Modal,
  Button,
  DatePicker,
  TimePicker,
  Dropdown,
  Menu,
  message,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import NewEventForm from "./NewEventForm";
// may need to move the above line into NewEventForm.js
import CalendarApp from "./CalendarApp";

const queryClient = new QueryClient();

document.addEventListener("DOMContentLoaded", () => {
  const domContainer = document.querySelector("#fullcalendar");
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <CalendarApp />
    </QueryClientProvider>,
    domContainer
  );
});

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
