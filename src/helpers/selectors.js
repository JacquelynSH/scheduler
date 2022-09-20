


export function getAppointmentsForDay(state, day) {

let resultsArray = [];

const appointmentByDay = state.days.filter(i => i.name === day);

  if(!appointmentByDay[0]) {
    return resultsArray;
  } 
  
const appointmentsByID = appointmentByDay[0].appointments;
  resultsArray = appointmentsByID.map(id => state.appointments[id]);
  return resultsArray 
};


  


