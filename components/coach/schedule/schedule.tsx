'use client'
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const ScheduleCalendar = () => {
  return (
    <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2024-04-01' },
          { title: 'event 2', date: '2024-04-02' }
        ]}
      />
  )
}

export default ScheduleCalendar