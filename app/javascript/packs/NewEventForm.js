import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Button, DatePicker, TimePicker, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import moment from "moment";
import { EVENT_TYPES } from "./CalendarApp";

export default function NewEventForm({ onChangeEventType, eventType }) {
  const mutation = useMutation((formData) => {
    return fetch(`/trips/${tripId}/events/new`, formData);
  }); //I suspect this has to go in the parent function

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

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]} arrow>
        <Button>{`${eventType}`}</Button>
      </Dropdown>
      {(eventType == EVENT_TYPES[1] && <p>Placeholder event</p>) ||
        (eventType == EVENT_TYPES[2] && <p>Placeholder stay</p>) ||
        (eventType == EVENT_TYPES[3] && <p>Placeholder journey</p>)}
    </div>
  );
}
