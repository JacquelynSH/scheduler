import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  function updateSpots(spot) {
    // find the current day - map over state.days and find return the day.name that matches the state.day
    const currentDay = state.days.find(day => day.name === state.day);
    // find the id of current day
    const dayId = currentDay.id;
    // update the amount of spots - make copy, map over, compare the id and update conditionally
    const updateDays = [...state.days].map(day => day.id === dayId ? { ...day, spots: day.spots + spot } : { ...day });

    return updateDays;
  };


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

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const prevInterview = state.appointments[id].interview;
    const num = prevInterview ? 0 : -1;

    const days = updateSpots(num)
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
      })
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(1)

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days
        }));
      })
  };



  return { state, setDay, bookInterview, cancelInterview }
}