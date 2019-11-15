const fetch = require("node-fetch");
//const regex = /.*(\d\d\/\d\d\/\d{4} : )(?<moi>.*)/gm;
regex_date = /\d\d\/\d\d\/\d{4}/;
regex_nom = /"(.*?)"/;
regex_sujet = //;
//let agenda = new Array()
// à itérer 
// let ligne = new Object();
// ligne.date =
// ligne.nom =
// ligne.sujet =
// agenda.push(ligne);


    const request = async () => {
        const response = await fetch('https://raw.githubusercontent.com/becodeorg/The-Watch/master/LIE-Hamilton-2.12/agenda.md?token=AMECOCECLASEZRS7XJIZLFC52QSOQ');
        const text = await response.text();
        const lines = text.split(/\n/);
        for(line of lines){
            regex_date
        }
        
         

        
        
        
    }
    
    request();
   