import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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



  // function is triggered by the interview being booked, it takes in id and interview as perameters
  function bookInterview(id, interview) {
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
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
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

  return {state, setDay, bookInterview, cancelInterview}
}