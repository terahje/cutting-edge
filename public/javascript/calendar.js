
var Calendar = require('tui-calendar'); 
/* CommonJS */
var DatePicker=require('tui-date-picker');
var TimePicker=require('tui-time-picker');


require("tui-calendar/dist/calendar.css");


var calendar = new Calendar(('#calendar'), {
    defaultView: 'month',
    taskView: true,
    template: {
      monthDayname: function(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
      }
      
    }
  });


    module.exports=calendar;