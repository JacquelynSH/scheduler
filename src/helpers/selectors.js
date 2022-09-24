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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    const interviewie = interview.student;
    const interviewerInfo = state.interviewers[interview.interviewer];
    return { student: interviewie, interviewer: interviewerInfo };
  }
}
