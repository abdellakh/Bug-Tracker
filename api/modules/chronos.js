let format_month = (month, en) => {
    switch (month) {
      case 1:
        en ? month = "January" : month = "Janvier";
        break;
      case 2:
        en ? month = "February" : month = "Février";
        break;
      case 3:
        en ? month = "March" : month = "Mars";
        break;
      case 4:
        en ? month = "April" : month = "Avril";
        break;
      case 5:
        en ? month = "May" : month = "Mai";
        break;
      case 6:
        en ? month = "June" : month = "Juin";
        break;
      case 7:
        en ? month = "July" : month = "Juillet";
        break;
      case 8:
        en ? month = "August" : month = "Août";
        break;
      case 9:
        en ? month = "September" : month = "Septembre";
        break;
      case 10:
        en ? month = "October" : month = "Octobre";
        break;
      case 11:
        en ? month = "November" : month = "Novembre";
        break;
      case 12:
        en ? month = "December" : month = "Décembre";
        break;
    }
    return month;
  };
let format_date = (date) => {
    date < 10 ? (date = "0" + date) : null;
    return date;
  };
let format_day = (day, en) => {
    switch (day) {
        case 0:
            en ? day = "Sunday" : day = "Dimanche";
            break;
        case 1:
            en ? day = "Monday" : day = "Lundi";
            break;
        case 2:
            en ? day = "Tuesday" : day = "Mardi";
            break;
        case 3:
            en ? day = "Wednesday" : day = "Mercredi";
            break;
        case 4:
            en ? day = "Thursday" : day = "Jeudi";
            break;
        case 5:
            en ? day = "Friday" : day = "Vendredi";
            break;
        case 6:
            en ? day = "Saturday" : day = "Samedi";
            break;
    }
    return day;
  };
  
module.exports = function (time, display_day, display_time, en) {
    //construct
    let day = format_day(time.getDay(), en || null);
    let date = format_date(time.getDate());
    let month = format_month(time.getMonth() + 1, en || null);
    let year = time.getFullYear();
    let hour = format_date(time.getHours());
    let min = format_date(time.getMinutes());
    let sec = format_date(time.getSeconds());
    //returns
    let res;
    if (display_day && display_time)
      res =
        day + " " + date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    else if (display_time && !display_day)
      res = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    else if (!display_time && display_day)
      res = day + " " + date + " " + month + " " + year;
    else res = date + " " + month + " " + year;

    return res;
  }
