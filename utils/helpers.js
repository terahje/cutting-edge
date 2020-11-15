module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
          date
        ).getFullYear()}`;
      }, 
    //   format_time: time => {
    //       return `${(new Date(time).toString("hh:mm tt"))}`;
    //   }
}