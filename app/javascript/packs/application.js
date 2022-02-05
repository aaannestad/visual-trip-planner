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
require('moment')

import {Calendar} from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

function loadCalendar() {
  var calendarEl = document.getElementById('calendar');
  var calendarData = document.getElementById('calendar_data');
  var calendar = new Calendar(calendarEl, {
    plugins: [timeGridPlugin],
    initialView: 'timeGrid',
      visibleRange: {
        start: calendarData.dataset.startDate,
        end: calendarData.dataset.endDate
      },
    events: `/trips/${tripId}/events.json`,
    eventClick : function(info) {
      var eventObj = info.event;
      window.location = `/trips/${tripId}/events/${eventObj.id}/edit`
    }
  });
  console.log(calendarData.dataset.startDate); //see what's in this element
  calendar.render();
};

$(document).on('turbolinks:load', loadCalendar);