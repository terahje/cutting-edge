





const calendarEl= document.getElementById(calendar);


let calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin ],
  initialView: 'dayGridWeek'
});


    module.exports=calendar;