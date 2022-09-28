export function getAppointmentsForDay(state, day) {
  let resultsArray = [];

  const appointmentByDay = state.days.filter((i) => i.name === day);

  if (!appointmentByDay[0]) {
    return resultsArray;
  }

  const appointmentsByID = appointmentByDay[0].appointments;
  resultsArray = appointmentsByID.map((id) => state.appointments[id]);
  return resultsArray;
}


export function getInterviewersForDay(state, day) {
  let resultsArray = [];

  // filtering through the state array. Gives you all in state.days array that meet the condition
  const appointmentByDay = state.days.filter((days) => days.name === day);

  // if there is no appointment return empty array
  if (!appointmentByDay[0]) {
    return resultsArray;
  }
  //appointmentsByID = basicly state.days.appointments array - [1, 2, 3] and [4, 5]
  const appointmentsByID = appointmentByDay[0].appointments;

  resultsArray = appointmentsByID.map((id) => state.interviewers[id]);

  return resultsArray;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewie = interview.student;
    const interviewerInfo = state.interviewers[interview.interviewer];
    return { student: interviewie, interviewer: interviewerInfo };
  }
}
