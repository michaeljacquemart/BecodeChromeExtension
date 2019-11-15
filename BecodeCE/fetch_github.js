const fetch = require("node-fetch");
//const regex_serge = /.*(\d\d\/\d\d\/\d{4} : )(?<moi>.*)/gm;
regex_date = /\d\d\/\d\d\/\d{4}/;
regex_nom = /"(.*?)"/;
regex_sujet = /"(.*?)"/;
let agenda = new Array();
 

    const request = async () => {
        const response = await fetch('https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=AMECOCECLASEZRS7XJIZLFC52QSOQ');
        const text = await response.text();
        const lines = text.split(/\n/);
        for(line of lines){
            let temp = new Object();
            temp.date = line.match(regex_date);
            temp.nom = line.match(regex_nom);
            temp.sujet = line.match(regex_sujet);
            agenda.push(temp);
        }

        console.log(agenda);
        
        
         

        
        
        
    }
    
    request();
   