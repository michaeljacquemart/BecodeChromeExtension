const fetch = require('node-fetch');
regex_date = /\d\d\/\d\d\/\d{4}/;
regex_subject = /"(.*?)"/;
regex_name = /\*\*(.*?)\*\*/;
let agenda = new Array();
let today = new Date();
let today_dd = String(today.getDate()).padStart(2, '0');
let today_mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let today_yyyy = today.getFullYear();
let date_match = false;

function isEmpty(str) {
  return (!str || 0 === str.length);
}

// Go to your group's agenda, check its raw version, take the token in the URL and put it in the 'myToken' variable.
// For instance, the agenda's URL of the Hamilton-2.12 group looks like this :
// https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=ALHFZ...  
// In this case, the token would be "ALHFZ...""

let myToken = "AMECOCDGZAUNMP7EDCV2RWK555ODC";

const request = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=" + `${myToken}`
  );
  const text = await response.text();
  const lines = text.split(/\n/);
  for (line of lines) {
    let temp = new Object();
    temp.line = line;
    if (line.match(regex_date)) {
      let watchdate = line.match(regex_date)[0].split("/");
      temp.date = new Date(watchdate[2], watchdate[1] - 1, watchdate[0], 15);
      let date_details = {watch_dd: String(temp.date.getDate()).padStart(2, '0'), watch_mm: String(temp.date.getMonth() + 1).padStart(2, '0'), watch_yyyy: temp.date.getFullYear()};
      temp.date_details = date_details;
      if (line.match(regex_name)) {
        temp.name = line.match(regex_name)[0].slice(2, -2);
      } else {
        temp.name = null;
      }
      if (line.match(regex_subject)) {
        temp.subject = line.match(regex_subject)[0].slice(1, -1);
      } else {
        temp.subject = null;
      }
      agenda.push(temp);
    } 
  }
  
  // the loop below returns the watch of the day
   
  console.log("Today's watch is :");
  
  for (let i = 1; i < agenda.length && date_match === false; i++) {
    if (agenda[agenda.length - i].date_details.watch_dd === today_dd && agenda[agenda.length - i].date_details.watch_mm === today_mm && agenda[agenda.length - i].date_details.watch_yyyy === today_yyyy) {
        let watch_of_the_day = agenda[agenda.length - i];
        date_match = true;
        for (let property in watch_of_the_day) {
            if (isEmpty(watch_of_the_day[property])) {
                console.log(property + ' is empty');

            } else {
                console.log(property + "=" + watch_of_the_day[property]);
            }
        }

    }
  }
  
};

request();
 