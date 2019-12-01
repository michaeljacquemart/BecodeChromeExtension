const fetch = require("node-fetch");
//const regex_serge = /.*(\d\d\/\d\d\/\d{4} : )(?<moi>.*)/gm;
regex_date = /\d\d\/\d\d\/\d{4}/;
regex_sujet = /"(.*?)"/;
regex_nom = /\*\*(.*?)\*\*/;
let agenda = new Array();
let today = new Date();
let today_dd = String(today.getDate()).padStart(2, '0');
let today_mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let today_yyyy = today.getFullYear();
let date_match = false;
function isEmpty(str) {
  return (!str || 0 === str.length);
}


const request = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=AMECOCEXMC4DEC4K6L3T6FS55VXP4"
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
      if (line.match(regex_nom)) {
        temp.nom = line.match(regex_nom)[0].slice(2, -2);
      } else {
        temp.nom = null;
      }
      if (line.match(regex_sujet)) {
        temp.sujet = line.match(regex_sujet)[0].slice(1, -1);
      } else {
        temp.sujet = null;
      }
      agenda.push(temp);
    } 
  }
  // boucle qui renvoie la veille d'aujourd'hui
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
