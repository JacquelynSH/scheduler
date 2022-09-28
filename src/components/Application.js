import "styles/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from "react";

import axios from "axios";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({
        ...prev, days, appointments, interviewers
      }));
    })
    .catch((err) => console.error(err.response))
  }, []);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
      // When the function is triggered by the interview being booked, it takes in id and interview as perameters
      function bookInterview(id, interview) {
        // id = the id of the interview slot 
        // interview = student: 'name entered', interviewer: 3 or whatever number id picked
        const appointment = {
          ...state.appointments[id], 
          interview: { ...interview }
        };
        console.log(appointment)

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        return axios
          .put(`/api/appointments/${id}`, {interview})
          .then(() => {
            setState(prev => ({
              ...prev,
              appointments
            }));
          })
      };
  
      function cancelInterview(id) {
        const appointment = {
          ...state.appointments[id], 
          interview: null
        };
        console.log(appointment)

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        return axios
          .delete(`/api/appointments/${id}`)
          .then(() => {
            setState(prev => ({
              ...prev,
              appointments
            }));
          })
      };

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
