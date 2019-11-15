const fetch = require("node-fetch");
//const regex_serge = /.*(\d\d\/\d\d\/\d{4} : )(?<moi>.*)/gm;
regex_date = /\d\d\/\d\d\/\d{4}/;
regex_sujet = /"(.*?)"/;
regex_nom = /\*\*(.*?)\*\*/;
let agenda = new Array();

const request = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=AMECOCECLASEZRS7XJIZLFC52QSOQ"
  );
  const text = await response.text();
  const lines = text.split(/\n/);
  for (line of lines) {
    let temp = new Object();
    temp.line = line;
    if (line.match(regex_date)) {
      let watchdate = line.match(regex_date)[0].split("/");
      temp.date = new Date(watchdate[2], watchdate[1] - 1, watchdate[0], 15);
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
    } else {
      console.log("isNull");
    }
  }
  console.log(agenda);
};

request();
