import React, { useState } from "react";
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

export const EVENT_TYPES = ["choose type", "Event", "Stay", "Journey"];

export default function CalendarApp() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch(`/trips/${tripId}/api.json`).then((res) => res.json())
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(`You confirmed ${event}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [event, setEvent] = useState({
    type: EVENT_TYPES[0],
  });

  const updateEventType = (type) => {
    setEvent((state) => {
      return { ...state, type: type };
    });
  };

  return (
    <>
      <Modal
        title="make a new event"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <NewEventForm
          eventType={event.type}
          onChangeEventType={(eventType) => {
            updateEventType(eventType);
          }}
        />
      </Modal>
      <div>
        {isLoading && <h1>loading data</h1>}
        {!isLoading && (
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGrid"
            visibleRange={{ start: data.start_date, end: data.end_date }}
            events={`/trips/${tripId}/events.json`}
            customButtons={{
              newEventButton: {
                text: "new event",
                click: () => {
                  showModal();
                },
              },
            }}
            headerToolbar={{ start: "title", end: "newEventButton" }}
          />
        )}
      </div>
    </>
  );
}
