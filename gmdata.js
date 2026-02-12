//GMData 1.5-05.2014
var GMvers="gmvw20";
var ValError="";

var PrefixUrl="escacs3/";
PrefixUrl="";

//var urlBIn="https://escacs.cat/escacs3/components/com_fce/";
//urlBIn="https://escacs.cat/components/com_fce/";
//urlB=urlBIn;

String.prototype.replaceAll = function(search, replace){if(!replace)return this;return this.replace(new RegExp('[' + search + ']', 'g'), replace);};
String.prototype.timesStringExist=function(c){var t=0,l=0;while(l=this.indexOf(c,l)+1)++t;return t};

(function() {
    Date.prototype.toYMD = Date_toYMD;
    function Date_toYMD() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
})();

function ajaxErrorCb (jqXHR, textStatus, errorThrown) {
  console.log(errorThrown);
  try {
    var parsedMessage = JSON.parse(jqXHR.responseText);
    if (parsedMessage.resultat) {
      alert(parsedMessage.resultat);
    } else {
      var alertText = 'Error. Rebut l\'objecte:\n';

      Object.keys(parsedMessage).forEach(function (key) {
        alertText += key + ': ' + parsedMessage[key] + '\n';
      });
      alert(alertText);
    }
  } catch (e) {
    alert(alertText);
  }
}

//Traducció jqxgrid
var traduccioJqxGrid_ca = {
// separator of parts of a date (e.g. '/' in 11/05/1955)
'/': "/",
// separator of parts of a time (e.g. ':' in 05:44 PM)
':': ":",
// the first day of the week (0 = Sunday, 1 = Monday, etc)
firstDay: 0,
days: {
// full day names
names: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
// abbreviated day names
namesAbbr: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"],
// shortest day names
namesShort: ["Dg", "Dl", "Dm", "Dc", "Dj", "Dv", "Ds"]
},
months: {
// full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
names: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Septembre", "Octubre", "Novembre", "Decembre", ""],
// abbreviated month names
namesAbbr: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec", ""]
},
// AM and PM designators in one of these forms:
// The usual view, and the upper and lower case versions
// [standard,lowercase,uppercase]
// The culture does not use AM or PM (likely all standard date formats use 24 hour time)
// null
AM: ["AM", "am", "AM"],
PM: ["PM", "pm", "PM"],
eras: [
// eras in reverse chronological order.
// name: the name of the era in this culture (e.g. A.D., C.E.)
// start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
// offset: offset in years from gregorian calendar
{"name": "D.C.", "start": null, "offset": 0 }
],
twoDigitYearMax: 2029,
patterns: {
// short date pattern
d: "d/m/yyyy",
// long date pattern
D: "dddd, MMMM dd, yyyy",
// short time pattern
t: "h:mm tt",
// long time pattern
T: "h:mm:ss tt",
// long date, short time pattern
f: "dddd, MMMM dd, yyyy h:mm tt",
// long date, long time pattern
F: "dddd, MMMM dd, yyyy h:mm:ss tt",
// month/day pattern
M: "MMMM dd",
// month/year pattern
Y: "yyyy MMMM",
// S is a sortable format that does not vary by culture
S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
},
percentsymbol: "%",
currencysymbol: "€",
currencysymbolposition: "before",
decimalseparator: ',',
thousandsseparator: '.',
pagergotopagestring: "Ves a la pàgina:",
pagershowrowsstring: "Mostra filera:",
pagerrangestring: " de ",
pagerpreviousbuttonstring: "previ",
pagernextbuttonstring: "següent",
groupsheaderstring: "Arrossega una columna i deixa-la aquí per agrupar per aquesta columna",
sortascendingstring: "Ordena ascendent",
sortdescendingstring: "Ordena descendent",
sortremovestring: "Elimina l'ordre",
groupbystring: "Agrupa per aquesta columna",
groupremovestring: "Remove from groups",
filterclearstring: "Esborra",
filterstring: "Filtra",
filtershowrowstring: "Mostra les columes que:",
filtershowrowdatestring: "Mostra les columnes amb data:",
filterorconditionstring: "O",
filterandconditionstring: "I",
filterselectallstring: "(Selecciona tots)",
filterchoosestring: "Esculli:",
filterstringcomparisonoperators: ['buit', 'no buit', 'conté', 'conté(considera majúscules)',
'no conté', 'no conté(considera majúscules)', 'comença amb', 'comença amb(considera majúscules)',
'acaba amb', 'acaba amb(considera majúscules)', 'igual', 'igual(considera majúscules)', 'nul', 'no nul'],
filternumericcomparisonoperators: ['igual', 'diferent', 'més petit que', 'més petit o igual que', 'més gran', 'més gran que', 'nul', 'not nul'],
filterdatecomparisonoperators: ['igual', 'diferent', 'més petit que', 'més petit o igual que', 'més gran', 'més gran que', 'nul', 'not nul'],
filterbooleancomparisonoperators: ['igual', 'diferent'],
validationstring: "El valor introduït no és vàlid",
emptydatastring: "No he trobat registres",
filterselectstring: "Seleccioni filtre",
loadtext: "Carregant...",
clearstring: "Neteja",
todaystring: "Avui"
};



//Funcions rendering jqxgrid

var llistaJugadors = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }

  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?op=2&' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title="Mostra els jugadors del club"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}

var llistaInscrits = function (row, columnfield, value, defaulthtml, columnproperties,columna) {

  JSONValue = jQuery.parseJSON(value);
  for(var name in JSONValue.crossData) {
    nameProp = name;
  }
  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  if (columna.esInscripcioWeb==1) retstr += '<a href="' + URLWeb + '?op=29&' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title="Mostra els jugadors inscrits"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';
  return retstr;
}

var llistaOF = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }
  var urlp="https://escacs.cat/components/com_fce/gmvw20/conn/ordre-forces-pdf.php";
  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + urlp + '?' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title="Mostra els jugadors del club"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}


var llistaFACT = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);
  for(var name in JSONValue.crossData) {
    nameProp = name;
  }
  nameProp="document";var deu=JSONValue.crossData['deure'];//alert(JSONValue.crossData['deure']);
  var urlp= urlB + GMvers + "/conn/pdf-factura.php";
  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  var namep=JSONValue.crossData[nameProp];namep=namep.trim();
  if(namep!="" && deu!="0.00") {
    retstr += '<a href="' + urlp + '?' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title="Mostra la factura"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  } else {
    retstr += '<a href="' + urlp + '?' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title=""></a>'
  }

  retstr += '</div>';
  return retstr;
}




var llistaJugadors20 = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }

  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?tasca=Jugadors&op=20&' + JSONValue.campCerca + '=' + JSONValue.crossData[nameProp] + '" title="Mostra els jugadors del club"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}

var llistaPartides = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }

  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?op=4&idJugador=' + JSONValue.crossData['idJugador'] + '&nom=' + JSONValue.crossData['nom'] + '" title="Mostra les partides del jugador"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}

var llistaPartidesActa = function (row, columnfield, value, defaulthtml, columnproperties, row) {

  var JSONValue = jQuery.parseJSON(value);

  retstr = '<div style="text-align: center;margin-top:5px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?op=20&tasca=resultats#/grup/' + row.idGrup + '/acta/' + row.id + '" title="Mostra el resultat de la ronda"><img src="../../components/com_fce/images/acta.png"/></a>'
  retstr += '</div>';

  return retstr;
}


var llistaElo = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }

  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?op=13&idJugador=' + JSONValue.crossData['idJugador'] + '&nom=' + JSONValue.crossData['nom'] + '" title="Mostra les partides del jugador"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}

var mostraTorneigClub = function (row, columnfield, value, defaulthtml, columnproperties) {

  JSONValue = jQuery.parseJSON(value);

  for(var name in JSONValue.crossData) {
    nameProp = name;
  }

  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<a href="' + URLWeb + '?op=5&idClub=' + JSONValue.crossData['idClub'] + '" title="Mostra els tornejos del club"><img src="../../components/com_fce/images/' + JSONValue.src + '"/></a>'
  retstr += '</div>';

  return retstr;
}

const formatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
});

var cellaRight = function(row, columnfield, value, defaulthtml, columnproperties, columna) {
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: right; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">';

  if (columnfield=="haver")  retstr += formatter.format(columna.haver);
  if (columnfield=="deure")  retstr += formatter.format(columna.deure);
    if (columnfield=="saldo")  retstr += formatter.format(columna.saldo);
  retstr += '</div>';
  return retstr;
}

var cellaBuida = function() {
  return '';
}

var veurePartidasJugadorBlanc = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">\n';
  retstr += '<a href="' + URLWeb + '?op=13&idJugador=' + columna.idJugadorBlanc + '&nom=' + columna.nomBlanc + '&expandGroup=' + encodeURIComponent(columna.nomComplet) + '" title="Mostra les partides del jugador">'+ value +'</a>';
  retstr += '</div>';
  
  return retstr;
}



var veurePartidasJugadorNegre = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">\n';
  retstr += '<a href="' + URLWeb + '?op=13&idJugador=' + columna.idJugadorNegre + '&nom=' + columna.nomNegre + '&expandGroup=' + encodeURIComponent(columna.nomComplet) + '" title="Mostra les partides del jugador">'+ value +'</a>';
  retstr += '</div>';
  
  return retstr;
}

var veureELOJugadorBlanc = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">\n';
  retstr += '<a href="' + URLWeb + '?op=13&idJugador=' + columna.idJugadorBlanc + '" title="Mostra l\'ELO del jugador">'+ value +'</a>';
  retstr += '</div>';
  
  return retstr;
}

var veureELOJugadorNegre = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">\n';
  retstr += '<a href="' + URLWeb + '?op=13&idJugador=' + columna.idJugadorNegre + '" title="Mostra l\'ELO del jugador">'+ value +'</a>';
  retstr += '</div>';
  
  return retstr;
}

var mostraFitxa = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  JSONValue = jQuery.parseJSON(value);
  
  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  retstr += '<img onClick="GMDLoadForm(\'' + jQuery.param(JSONValue.crossData) + '\',\'' + JSONValue.fitxa + '\',\'' + JSONValue.dest + '\',this,' + JSONValue.dlg + ', ' + JSONValue.wd+ ')" src="../../components/com_fce/images/' + JSONValue.src + '"/>'
  retstr += '</div>';
  return retstr;
}

function MsgInscrData(cd) {
 if (cd==1) alert("Inscripció tancada");	
}
var popInscrData = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  JSONValue = jQuery.parseJSON(value);
  var src=JSONValue.src;var isdins=false;
  if (columna.dataIniciInscripcio!="" && columna.dataFiInscripcio!="") {
    var dataI  = new Date(columna.dataIniciInscripcio.substr(0,4),columna.dataIniciInscripcio.substr(5,2)-1,columna.dataIniciInscripcio.substr(8,2));
    var dataF  = new Date(columna.dataFiInscripcio.substr(0,4),columna.dataFiInscripcio.substr(5,2)-1,columna.dataFiInscripcio.substr(8,2));
    var dataA = new Date(Date.now());
    if (dataA>=dataI && dataA<=dataF) isdins=true;
  }
  if (isdins==false) src=JSONValue.src2;
  retstr = '<div style="text-align: center;margin-top:10px;cursor:pointer">\n';
  var ZZ=jQuery.param(JSONValue.crossData);
  ZZ='nou=true';
  JSONValue.dlg=columna.idTorneig;
  var cname=columna.nomComplet;
  var cnotes1=columna.Notes1;
  var cpreus=columna.preus;
  
 if (columna.esInscripcioWeb==1 && isdins==true) {
   retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 10px;">\n';
   retstr += '<a href="' + URLWeb + '?op=30&idTorneig=' + columna.idTorneig + '" title="Inscripció al torneig">';
   retstr += '<img src="../../components/com_fce/images/' + JSONValue.src + '"/>';
   retstr += '</a></div>';
  }
 
 // if (columna.esInscripcioWeb==1 && isdins==true) retstr += '<img onClick="GMDLoadForm(\'' + ZZ + '\',\'' + JSONValue.fitxa + '\',\'' + JSONValue.dest + '\',this,' + JSONValue.dlg + ', ' + JSONValue.wd + ',\'' + cname + '\',\'' + cnotes1 + '\',\'' + cpreus + '\')" src="../../components/com_fce/images/' + src + '"/>'
  if (columna.esInscripcioWeb==1 && isdins==false) retstr += '<img onClick="MsgInscrData(1)" src="../../components/com_fce/images/' + src + '"/>';
  retstr += '</div>';
  return retstr;
}

var popTournamentData = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  JSONValue = jQuery.parseJSON(value);

  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 10px;">\n';
  retstr += '<a href="' + URLWeb + '?op=7&idTorneig=' + columna.idTorneig + '" title="Mostra els detalls del torneig">';
  retstr += '<img src="../../components/com_fce/images/' + JSONValue.src + '"/>';
  retstr += '</a></div>';
  
  return retstr;
}

var licitacioTorneig = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  JSONValue = jQuery.parseJSON(value);

  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 10px;">\n';
  retstr += '<a href="' + URLWeb + '?op=18&idTorneig=' + columna.idTorneig + '" title="Mostra els detalls del torneig">';
  retstr += '<img src="../../components/com_fce/images/' + JSONValue.src + '"/>';
  retstr += '</a></div>';
  
  return retstr;
}

var descarregaInforme = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  JSONValue = jQuery.parseJSON(value);

  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 10px;">\n';
  retstr += '<a href="https://escacs.cat/components/com_fce/informesTorneig/informeTorneig-' + columna.idTorneig + '.zip" title="Mostra els detalls del torneig">';
  retstr += '<img src="../../components/com_fce/images/' + JSONValue.src + '"/>';
  retstr += '</a></div>';
  
  return retstr;
}


var groupsrendererPartides = function (text, group, expanded, data) {

//  return '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;"><strong>' + data.subItems[0].dataInici.substr(0, data.subItems[0].dataInici.indexOf('-')) + ' - ' + text.substr(text.indexOf(':') + 2)  + '</strong></div>';

  return '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;"><strong>' + data.subItems[0].dataInici.substr(6, 4) + ' - ' + text.substr(text.indexOf(':') + 2)  + '</strong></div>';

}

var resultatCalendari = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  if(value == '0.0 - 0.0') {
    value = '';
  }
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">' + value + '</div>';

  return retstr;
}

var obreVisorPGN = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  var rowData = jQuery(".cont_grid").jqxGrid('getrowdata', row);
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 5px;">\n';
  retstr += '<a href="https://escacs.cat/visorpgn/frame.html?games=../partides/' + rowData.fitxer + '.pgn&ig=' + rowData.num + '" title="Mostra la partida">';
  retstr += '<img src="../../components/com_fce/images/fitxa.png"/>';
  retstr += '</a></div>';
  
  return retstr;
}
var obreFitxerPGN = function (row, columnfield, value, defaulthtml, columnproperties, columna) {
  
  var rowData = jQuery(".cont_grid").jqxGrid('getrowdata', row);
  retstr = '<div style="overflow: hidden; text-overflow: ellipsis; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 5px;">\n';
  retstr += '<a href="../../components/com_fce/gmvw20/conn/txt-pgn-file.php?nom=' + rowData.fitxer + '&num=' + rowData.num + '" title="Baixa fitxer PGN">';
  retstr += '<img src="../../components/com_fce/images/fitxa.png"/>';
  retstr += '</a></div>';
  return retstr;
}

var groupsrendererCalendari = function (text, group, expanded, data) {
  if(group.search('Categoria')) {
    return '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;"><strong>' + text.replace("Categoria: ", "");   + '</strong></div>';
  } else {
    console.log(data.subItems[0].dataPartides);
    return '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;"><strong>' + group  + data.subItems[0].dataPartides + '</strong></div>';
  }
}

var groupsrendererFilialsAdmin = function (text, group, expanded, data) {
  return '<div style="overflow: hidden; cursor: pointer; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 4px;"><strong onclick="GMDLoadForm(\'idClub=' + data.subItems[0].idClub + '\',\'c_f_club\',\'fitxa_dades\',this,1, 600)">' + data.subItems[0].nomClub + ' - ' + data.subItems[0].delegacioClub + '<img src="../../components/com_fce/images/fitxa.png" style="width: 40px; height: 40px; margin-left: 10px;"/></strong></div>';
}


var groupsrendererElo = function (text, group, expanded, data) {
  var variacio = 0,num=0,punts=0;
  var isnorma="";
  for(var i = 0; i < data.subItems.length; i++) {
    variacio += parseFloat(data.subItems[i].variacioElo);num=num+1;
	
	if(data.subItems[i].colpart=='b' && data.subItems[i].resultat=='1-0') punts=punts+1;
	if(data.subItems[i].colpart=='b' && data.subItems[i].resultat=='+.-') punts=punts+1;
	if(data.subItems[i].colpart=='n' && data.subItems[i].resultat=='0-1') punts=punts+1;	
	if(data.subItems[i].colpart=='n' && data.subItems[i].resultat=='-.+') punts=punts+1;
	if(data.subItems[i].colpart=='b' && data.subItems[i].resultat=='½-½') punts=punts+0.5;
	if(data.subItems[i].colpart=='n' && data.subItems[i].resultat=='½-½') punts=punts+0.5;
	
	if(data.subItems[i].torneig==data.subItems[i].variatorn) isnorma=" i Norma MC";
	}
//data.subItems[0].dataInici.substr(0, data.subItems[0].dataInici.indexOf('-')) + ' - ' +  
  return '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;"><strong>' +  text.substr(text.indexOf(':') + 2)  + '  (Partides '+ num +'; Punts: '+ punts +'; Increment ELO: ' + variacio.toFixed(2)  +  ' ' + isnorma + ')</strong></div>';
}


var opcionsDelegats = function (row, column, editor) {
                            // assign a new data source to the combobox.
                            editor.jqxDropDownList({ source: ["President", "Delegat"], dropDownHeight: 75 });
                        }

var opcionsArbitres = function (row, column, editor) {
                            // assign a new data source to the combobox.
                            editor.jqxDropDownList({ source: ["Principal", "Adjunt"], dropDownHeight: 75});
                        }
                        
var opcionsRenovacio = function (row, column, editor) {
                            // assign a new data source to the combobox.
                            editor.jqxDropDownList({ source: ["Sí", "No"], dropDownHeight: 75 });
                        }
                        
var opcionsGrups = function (row, column, editor) {
  editor.jqxDropDownList({source: llistaParellsKeyValueAdapters['grupsFilials'], displayMember: 'label', valueMember: 'value' });    
}
 
var opcionsDivisions = function (row, column, editor) {
  editor.jqxDropDownList({source: llistaParellsKeyValueAdapters['divisionsFilials'], displayMember: 'label', valueMember: 'value' });    
}
   
var opcionsCarrecs = function (row, column, editor) {
  editor.jqxDropDownList({source: llistaParellsKeyValueAdapters['configCarrecs'], displayMember: 'label', valueMember: 'value' });    
}
      
                        
                        
var assumpteMissatge = function (row, columnfield, value, defaulthtml, columnproperties) {
  
  var retstr = '<div style=\'overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 17px;\'>';
  
  switch(value) {
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    case '5':
      break;  
    case '6':
      retstr += 'Nova alta de jugador';
      break;
    case '7':
      break;
    case '8':
      break;
    case '9':
      break;
    case '10':
      break;
    case '11':
      break;
    case '12':
      break;
  }
  retstr += '</div>';
  return retstr;
}                        
                        
var llegitMissatge = function (row, columnfield, value, defaulthtml, columnproperties){
  var retstr = '<div style=\'overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; padding-left: 10px; margin-right: 2px; margin-left: 4px; margin-top: 17px;\'>';
  if(value == 'S')retstr += '<span class=\'glyphicon glyphicon-folder-open\'></span>'
  else retstr += '<span class=\'glyphicon glyphicon-folder-close\'></span>'
  retstr += '</div>';
  return retstr;
}

var contestatMissatge = function (row, columnfield, value, defaulthtml, columnproperties){
  var retstr = '<div style=\'overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; padding-left: 30px; margin-right: 2px; margin-left: 4px; margin-top: 17px;\'>';
  if(value == '2')retstr += '<span class=\'glyphicon glyphicon-ok\'></span>'
  else retstr += '<span class=\'glyphicon glyphicon-remove\'></span>'
  retstr += '</div>';
  return retstr;
}
         
var dinsForaTerminiLicitacio = function dinsForaTerminiLicitacio(row, columnfield, value, defaulthtml, columnproperties, columna) {
  var rowData = jQuery(".cont_grid").jqxGrid('getrowdata', row);

  if (!(rowData && rowData[0] && rowData[0][1])) {
    return '';
  }

  var parsedDataFiLicitacio = rowData[0][1].dataFiLicitacio.match(/(\d{2})-(\d{2})-(\d{4})/);
  var dataLicitacio = new Date(rowData[0][1].dataLicitacio.replace(/-/g,'/'));

  if (dataLicitacio && parsedDataFiLicitacio) {
    parsedDataFiLicitacio = new Date(parsedDataFiLicitacio[3] + '/' + parsedDataFiLicitacio[2] + '/' + parsedDataFiLicitacio[1]);

  }
  var retstr = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: left; margin-right: 2px; margin-left: 4px; margin-top: 16.5px;">\n';
  retstr += '<span ' + (dataLicitacio && parsedDataFiLicitacio && dataLicitacio > parsedDataFiLicitacio ? 'style="color: red;"' : '') +'>';
  retstr += (dataLicitacio && dataLicitacio.toLocaleString ? dataLicitacio.toLocaleString() : '');
  retstr += '</span></div>';
  return retstr;
}
		 
// INICI - Funcions edició jqxgrid
var actualitzaFilera =  function (rowid, rowdata, commit) {
  // synchronize with the server - send update command
  jQuery.ajax({
    url: urlB + GMvers + "/conn/sincJqxgrid.php",
    type: 'POST',
    crossDomain: 'true',
    data: jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

var controladorLicitacio =  function (rowid, rowdata, commit) {
  // synchronize with the server - send update command
  jQuery.ajax({
    url: urlB + GMvers + "/conn/controladorLicitacions.php",
    type: 'POST',
    crossDomain: 'true',
    data: "operacio=editaCarrec&" + jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

var controladorLicitacioAdj =  function (rowid, rowdata, commit) {
  // synchronize with the server - send update command
  jQuery.ajax({
    url: urlB + GMvers + "/conn/controladorLicitacions.php",
    type: 'POST',
    crossDomain: 'true',
    data: "operacio=adjudicacions&" + jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

var controladorLicitacioParticipa = function (rowid, rowdata, commit) {
  // synchronize with the server - send update command;
  jQuery.ajax({
    url: urlB + GMvers + "/conn/controladorLicitacions.php",
    type: 'POST',
    crossDomain: 'true',
    data: "operacio=participa&" + jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
        jQuery.ajax({
          type     : 'POST',
          cache    : false,
          url      : urlB + GMvers + "/conn/resultatCerca.php",
          data     : 'idTorneig=' + $_GET['idTorneig'] + '&nomFitxa=c_gestio_licitacions_candidats_1.xml&dadesCercar=gestio_licitacions_candidats_1.xml',
          success  : function(data) {           
              dibuixaGrid(data, 'candidatsLicitacio');
          }
        });
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

var controladorLicitacioMetaDades = function (rowid, rowdata, commit) {
  // synchronize with the server - send update command;
  if(rowdata.publicitaLicitacio === true) {
    var canviaData = confirm("Si modifica la data límit per participar en la licitació tots els àrbitres rebran un missatge.");
  } else {
    var canviaData = true;
  }
  
  if(canviaData) {
    jQuery.ajax({
      url: urlB + GMvers + "/conn/controladorLicitacions.php",
      type: 'POST',
      crossDomain: 'true',
      data: "operacio=dadesLicitacio&" + jQuery.param(rowdata),
      error : function(jqXHR, exception, error) {
                    resultat = jQuery.parseJSON(jqXHR.responseText);  
                    alert("Error " + jqXHR.status + ":\n" + resultat.error);
                    commit(false);
                  },
      success: function(data) {
        resultat = jQuery.parseJSON(data);
        if(resultat.result == true) {
          commit(true);
        } else {
          commit(false);
          alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
        }
      }
    });
  } else {
    commit(false);
  }
}

var actualitzaFileraCategoriaClub =  function (rowid, rowdata, commit) {
  // synchronize with the server - send update command

  jQuery.ajax({
    url: urlB + GMvers + "/conn/sincJqxgrid.php",
    type: 'POST',
    crossDomain: 'true',
    data: "operacio=updateFilials&" + jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

var actualitzaFileraNomesNova =  function (rowid, rowdata, commit) {
  if(rowdata.newData == 'false') {
    return commit(false);
  }
  
  // synchronize with the server - send update command
  jQuery.ajax({
    url: urlB + GMvers + "/conn/sincJqxgrid.php",
    type: 'POST',
    crossDomain: 'true',
    data: jQuery.param(rowdata),
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(data) {
      resultat = jQuery.parseJSON(data);
      if(resultat.result == true) {
        commit(true);
      } else {
        commit(false);
        alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
      }
    }
  });
}

// FI - Funcions edició jqxgrid

// Geocoder pels mapes
geocoderGoogleMaps = new google.maps.Geocoder();

jQuery(document).ready(function() {
  GMDCercaForm(xmlCform, "fitxa_cerca");
});

var btnrenderer = function (row, datafield, value) { return '<input type="button" value="' + value + '"/>'; }
//Fi funcions específiques jqxGrid
/**
* Function  GMDCercaForm
*
* Gestiona la crida ajax per incloure a la pàgina un formulari de cerca segons el rol
*
* @data juliol 2014
* @author     mcrit sl
* @version    1.0
*
* @param (String) xmlCform xml template per recuperar dades sobre les que es pot cercar segon el rol
* @param (String) tagdest id del <div> on deixar el resultat
* @param (String) dlg PENDENT 0 = sobre pàgina,  1 = emergent
*
* @return dialeg jQuery amb <div> formulari cerca
*
*/
function dibuixaGrid(data, targetId) {
	
  resultatCerca = jQuery.parseJSON(data);
  var orderdata=data.indexOf("torneigs_no_admin");
  var orasc=data.indexOf('"dates":"ASC"');
  var ordesc=data.indexOf('"dates\":"DESC"');	
  var dates=data.indexOf("data");
  delete data;

  var reg = new RegExp('^\\d+$');
  var regArray = new RegExp('\[(.?)\]');
  
  // Les funcions renderer arriven com strings, no com a funcions. Les cridem fent servir l'objecte window[]
  for(var i = 0; i < resultatCerca.params.columns.length; i++) {
    for(var prop in resultatCerca.params.columns[i]) {
      if(resultatCerca.params.columns[i][prop] == 'true') resultatCerca.params.columns[i][prop] = true;
      if(resultatCerca.params.columns[i][prop] == 'false') resultatCerca.params.columns[i][prop] = false;
      if(reg.test(resultatCerca.params.columns[i][prop])) resultatCerca.params.columns[i][prop] = parseInt(resultatCerca.params.columns[i][prop]);
      if(typeof(window[resultatCerca.params.columns[i][prop]]) == 'function') {
        resultatCerca.params.columns[i][prop] = window[resultatCerca.params.columns[i][prop]];
      }
      
      if(prop == 'dataAdapter') {
        for(var j = 0; j < resultatCerca.source.datafields.length; j++) {
          if(resultatCerca.source.datafields[j].name == resultatCerca.params.columns[i]['dataField']) {
            resultatCerca.source.datafields[j].values = {source: llistaParellsKeyValueAdapters[resultatCerca.params.columns[i][prop]].records, value: 'value', name: 'label' };
            break;
          }
        }
      
      }
      
    }
  }

  var contButton = resultatCerca.buttons;

  var sourceCerca =
    {
    datatype: 'array',
    datafields: resultatCerca.source.datafields,
    localdata: resultatCerca.source.localdata,
    id: resultatCerca.source.id,
    updaterow: window[resultatCerca.source.updaterow],
    addrow: window[resultatCerca.source.addrow]
    };

  delete resultatCerca.source;

  var dataAdapterCerca = new jQuery.jqx.dataAdapter(sourceCerca);
  var params = resultatCerca.params;
  var defaults = resultatCerca.defaultValues;
  delete resultatCerca;
  params.source = dataAdapterCerca;

  for(var i = 0; i < sourceCerca.datafields.length; i++) {
    for(prop in sourceCerca.datafields[i]) {
      if(prop == 'values') {
        if(typeof sourceCerca.datafields[i].values.source == 'string') {
          sourceCerca.datafields[i].values.source = llistaParellsKeyValueAdapters[sourceCerca.datafields[i].values.source].records;
        }
      }
    }
  }

  // Transforma els tipus en els que necessita jqgrid.
  for(var prop in params) {
    if(params[prop] == 'true') params[prop] = true;
    if(params[prop] == 'false') params[prop] = false;
    if(reg.test(params[prop])) params[prop] = parseInt(params[prop]);
    if(typeof params[prop] == 'string') {
      if(params[prop].charAt(0) == '[' && params[prop].charAt(params[prop].length-1) == ']') {
        params[prop] = JSON.parse(params[prop]);
      }
    }
    
    if(typeof window[params[prop]] == 'function') {
        params[prop] = window[params[prop]];
    }
  }
  
 
  params.ready = function() {
      
    if(typeof($_GET['expandGroup']) != 'undefined' || typeof($_GET['expandGroup']) != 'NULL') {
      
      group = true;
      var group = jQuery('#' + targetId + ' .cont_grid').jqxGrid('getgroup', 0);
      for(var i = 1; group ;i++) {
        if(group.group == $_GET['expandGroup']) jQuery('#' + targetId + ' .cont_grid').jqxGrid('expandgroup', i - 1);
        group = jQuery('#' + targetId + ' .cont_grid').jqxGrid('getgroup', i);
      }

    }
  }
  
  //jQuery('.cont_grid').jqxGrid('destroy');
  jQuery('#' + targetId + '').empty();
  jQuery('#' + targetId + '').append('<div class="top_cont_grid"></div><div class="cont_grid"></div><div class="bottom_cont_grid"></div>');
  jQuery('#' + targetId + ' .cont_grid').jqxGrid(params);
  jQuery('#' + targetId + ' .cont_grid').jqxGrid('localizestrings', traduccioJqxGrid_ca);
  
  
  if(typeof params['groups'] != 'undefined') {
    jQuery('#' + targetId + ' .cont_grid').on("bindingcomplete", function (event) {
      for(var i = 0, ln = params['groups'].length; i < ln; i++) {
        jQuery('#' + targetId + ' .cont_grid').jqxGrid('addgroup', params['groups'][i]);
      }
    });
  }
  
  jQuery('#' + targetId + ' .cont_grid').jqxGrid(params);
  htmlButton = '';
  for(var i = 0; i < contButton.length; i++) {
    metodesButtons = [];
    for(var j = 0; j < contButton[i].buttons.length; j++) {
      classVal = 'btn btn-default ';
      htmlButton += '<input type="button" ';
      for  (prop in contButton[i].buttons[j]) {    
        switch(prop) {
          case 'jqxmethod':
            metodesButtons.push(contButton[i].buttons[j].jqxmethod);
          case 'class':
            classVal += contButton[i].buttons[j][prop] + ' ';
            break;
          default:
            htmlButton += prop + '="' + contButton[i].buttons[j][prop] + '" ';
        }
      
      }
      htmlButton += ' class="' + classVal + '"/>\n';
      
    }
    jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid').append(htmlButton);


    //Carrega els mètodes que han aparegut - Possible treure d'aquí per facilitar la lectura
    for(var j = 0; j < metodesButtons.length; j++) {
	    switch(metodesButtons[j]) {
        // CONTROL LICITACIONS
        case 'senseLicitacio':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .senseLicitacio').on('click', function () {
            var nolicita = confirm("Vol que l'assignació d'àrbitres sigui privada? En cas d'haver publicat la licitació, els àrbitres rebran un avís.");
            if(nolicita == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controladorLicitacions.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=marcaSenseLicitacio&" + jQuery.param(rowData),
                error : function(jqXHR, exception, error) {
                  resultat = jQuery.parseJSON(jqXHR.responseText);  
                  alert("Error " + jqXHR.status + ":\n" + resultat.error);
                },
                success: function(data) {
                  resultat = jQuery.parseJSON(data);  
                  if(resultat.result == true) {
                    var commit = jQuery(obJQ).jqxGrid('deleterow', idRow);
                  } else {
                    alert("ERROR: " + resultat.resultat);
                  }
                }
              });
            } 
          });
          break;
        case 'publicaLicitacio':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .publicaLicitacio').on('click', function () {
            var renova = confirm("Si canvia l'estat de publicació, tots els àrbitres actius rebran un avis.");
            if(renova == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controladorLicitacions.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=publica&" + jQuery.param(rowData),
                error : function(jqXHR, exception, error) {
                  resultat = jQuery.parseJSON(jqXHR.responseText);  
                  alert("Error " + jqXHR.status + ":\n" + resultat.error);
                },
                success: function(data) {
                  resultat = jQuery.parseJSON(data);  
                  if(resultat.result == true) {
                    location.reload();
                  } else {
                    alert("ERROR: " + resultat.resultat);
                  }
                }
              });
            } 
          });
          break;
        case 'despublicaLicitacio':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .despublicaLicitacio').on('click', function () {
            var renova = confirm("Si canvia l'estat de publicació, tots els àrbitres actius rebran un avis.");
            if(renova == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controladorLicitacions.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=despublica&" + jQuery.param(rowData),
                error : function(jqXHR, exception, error) {
                  resultat = jQuery.parseJSON(jqXHR.responseText);  
                  alert("Error " + jqXHR.status + ":\n" + resultat.error);
                },
                success: function(data) {
                  resultat = jQuery.parseJSON(data);  
                  if(resultat.result == true) {
                    location.reload();
                  } else {
                    alert("ERROR: " + resultat.resultat);
                  }
                }
              });
            } 
          });
          break;
        case 'trametLicitacio':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .trametLicitacio').on('click', function () {
            var renova = confirm("Un cop hagi validat la licitació, el torneig canviarà d'estat i tots els licitants rebran un avís.");
            if(renova == true) {
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controladorLicitacions.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=tanca&idTorneig=" + $_GET['idTorneig'],
                error : function(jqXHR, exception, error) {
                  resultat = jQuery.parseJSON(jqXHR.responseText);  
                  alert("Error " + jqXHR.status + ":\n" + resultat.error.join('\n'));
                },
                success: function(data) {
                  resultat = jQuery.parseJSON(data);  
                  if(resultat.result == true) {
                    location.reload();
                  } else {
                    alert("ERROR: " + resultat.resultat);
                  }
                }
              });
            } 
          });
          break;
		  
		case 'afegeixCarrecPop':
	        jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .afegeixCarrecPop').on('click', function () {
            var fitxa = jQuery(this).attr('fitxa');	
            GMDNovaFitxaPopFix(fitxa, targetId, defaults,$_GET['idTorneig']);
          });
          break;
		  case 'afegeixCarrec':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .afegeixCarrec').on('click', function () {
            jQuery.ajax({
              url: urlB + GMvers + "/conn/controladorLicitacions.php",
              type: 'POST',
              crossDomain: 'true',
              data: "operacio=afegeixCarrec&idTorneig=" + $_GET['idTorneig'],
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result == true) {
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : {
                      idTorneig: $_GET['idTorneig'],
                      nomFitxa : 'c_gestio_licitacions_candidats_1.xml',
                      dadesCercar : 'gestio_licitacions_candidats_1.xml'
                    },					  
                    success  : function(data) {           
                        dibuixaGrid(data, 'candidatsLicitacio');
                    }
                  });
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : {
                      idTorneig : $_GET['idTorneig'],
                      nomFitxa : 'c_gestio_licitacions_oferta_carrecs_1.xml',
                      dadesCercar : 'gestio_licitacions_oferta_carrecs_1.xml'
                    },
                    success  : function(data) {           
                        dibuixaGrid(data, 'carrecsOfertats');
                    }
                  });
                } else {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                }
              }
            });
          });
          break;
        case 'esborraCarrec':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .esborraCarrec').on('click', function () {
            var esborra = confirm("Vol esborrar els carrecs seleccionats? També s'eborraran les candidatures associades.");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controladorLicitacions.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=esborraCarrec&idTorneig=" + $_GET['idTorneig'] + "&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    var commit = jQuery(obJQ).jqxGrid('deleterow', idRow);
                    jQuery.ajax({
                      type     : 'POST',
                      cache    : false,
                      url      : urlB + GMvers + "/conn/resultatCerca.php",
                      data     : 'idTorneig=' + $_GET['idTorneig'] + '&nomFitxa=c_gestio_licitacions_candidats_1.xml&dadesCercar=gestio_licitacions_candidats_1.xml',
                      success  : function(data) {           
                          dibuixaGrid(data, 'candidatsLicitacio');
                      }
                    });
                    jQuery.ajax({
                      type     : 'POST',
                      cache    : false,
                      url      : urlB + GMvers + "/conn/resultatCerca.php",
                      data     : 'idTorneig=' + $_GET['idTorneig'] + '&nomFitxa=c_gestio_licitacions_adjudica_carrecs_1.xml&dadesCercar=gestio_licitacions_adjudica_carrecs_1.xml',
                      success  : function(data) {           
                          dibuixaGrid(data, 'adjudicaCarrecs');
                      }
                    });
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'addFilial':
         jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .addFilial').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery.ajax({
              url: urlB + GMvers + "/conn/sincJqxgrid.php",
              type: 'POST',
              crossDomain: 'true',
              data: "tempo=1&operacio=crea&" + jQuery.param(defaults),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result == true) {
                  if(jQuery('#filialsT').length > 0) {
                    var idGridFilial = 'filialsT';
                    var numFitxaFilial = 1;
                  } else {
                    var idGridFilial = 'filialsNT';
                    var numFitxaFilial = 0;
                  }
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : 'idClub=' + resultat.defaultValues.idClub + '&tb=fce_clubsfilials&nomFitxa=c_f_clubs_filials_1.xml&dadesCercar=f_clubs_filials_' + numFitxaFilial + '.xml',
                    success  : function(data) {           
                        dibuixaGrid(data, idGridFilial);
                    }
                  });
                } else {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                }
              }
            });
          });
          break
        case 'addEmptyRow':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .addEmptyRow').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery.ajax({
              url: urlB + GMvers + "/conn/sincJqxgrid.php",
              type: 'POST',
              crossDomain: 'true',
              data: "operacio=crea&" + jQuery.param(defaults),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result == true) {
                  var commit = jQuery(obJQ).jqxGrid('addrow', resultat.id, resultat.defaultValues, 'top');
                  //jQuery(obJQ).jqxGrid('beginrowedit', 0);
                } else {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                }
              }
            });
          // Inicia edició de la nova entrada
 
          });
          break;
        case 'trametRenovacioSP':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .trametRenovacioSP').on('click', function () {
            alert('El seu club no disposa de l\'autorització per tramitar llicències. Contacti amb la Federació Catalana d\'Escacs.');
          });
          break;
        case 'trametEquips':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .trametEquips').on('click', function () {
            var renova = confirm("Un cop hagi enviat els equips, només la Federació Catalana d'Escacs podrà canviar-los.");
            if(renova == true) {
              jQuery.ajax({
                url: urlB + GMvers + "/conn/desar.php",
                type: 'POST',
                crossDomain: 'true',
                data: "crear=4&nomFitxa=f_clubs_filials_0.xml&observacioEquips=" + encodeURI(jQuery("[name='observacioEquips']").val()),
                error : ajaxErrorCb,
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",
                      type: 'POST',
                      crossDomain: 'true',
                      data: "assumpte=15",
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                      success: function() {
                        alert("Ha enviat els equips. Tanqui aquest missatge per actualitzar la pantalla");
                        location.reload();
                      }
                    })
                     
                  } else {
                    alert("ERROR: " + resultat.resultat);
                  }
                }
              });
            }
          });
          break;
        case 'trametRenovacio':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .trametRenovacio').on('click', function () {
            var renova = confirm("Un cop hagi enviat la renovació, es generarà l'ordre de facturació.");
            if(renova == true) {
              jQuery.ajax({
                url: urlB + GMvers + "/conn/desar.php",
                type: 'POST',
                crossDomain: 'true',
                data: "crear=3&nomFitxa=jugadors_renovats_1.xml" ,
                error : ajaxErrorCb,
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    location.reload(); 
				    var c2=resultat.resultat;
                    alert(c2);					
                  } else {
				    var c2=resultat.message;
                    alert("ERROR: No he pogut desar les dades.\n\n"+c2);
                  }
                }
              });
            }
          });
          break;
        case 'denegaNou':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .denegaNou').on('click', function () {
            var esborra = confirm("Vol esborrar els registres seleccionats?");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                rowData: rowData,
                crossDomain: 'true',
                data: "operacio=esborra&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    var commit = jQuery(obJQ).jqxGrid('deleterow', idRow);
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",
                      type: 'POST',
                      crossDomain: 'true',
                      data: "remitentClub=348&idClub=" + this.rowData['idClub'] + "&assumpte=10&contingut=" + encodeURI("La Federació Catalana d'Escacs ha rebutjat la creació de la llicència federativa del jugador :"+this.rowData['nomllarg']+""),
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                    
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'deleteEquip':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .deleteEquip').on('click', function () {
            var esborra = confirm("Vol esborrar els registres seleccionats?");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=esborraFilial&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    var commit = jQuery(obJQ).jqxGrid('deleterow', idRow);
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'noAprovaInforme':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .noAprovaInforme').on('click', function () {
		  
		    var motiu='',name=prompt("Introdueix el motiu del rebuig:","");
		    if (name!=null) motiu=name;		  
            var esborra = confirm("Vol rebutjar l'informe del torneig sel·leccionat?");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controllerTorneig.php",
                type: 'POST',
                crossDomain: 'true',
				data: "operacio=noAprovaInforme&motiu=" + motiu + "&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    jQuery.ajax({
                      type     : 'POST',
                      cache    : false,
                      url      : urlB + GMvers + "/conn/resultatCerca.php",
                      data     : 'tb=fce_clubs&estat=4&nomFitxa=c_gestio_torneig_admin_c_1.xml&dadesCercar=gestio_torneig_admin_c_1.xml',
                      success  : function(data) {           
                          dibuixaGrid(data, 'pendentsInforme');
                      }
                    });
                    
                    jQuery.ajax({
                      type     : 'POST',
                      cache    : false,
                      url      : urlB + GMvers + "/conn/resultatCerca.php",
                      data     : 'tb=fce_clubs&estat=5&nomFitxa=c_gestio_torneig_admin_d_1.xml&dadesCercar=gestio_torneig_admin_d_1.xml',
                      success  : function(data) {           
                          dibuixaGrid(data, 'enRevisio');
                      }
                    });
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'aprovaInforme':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .aprovaInforme').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
            var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
            var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
            jQuery.ajax({
              url: urlB + GMvers + "/conn/controllerTorneig.php",
              type: 'POST',
              crossDomain: 'true',
              data: "operacio=aprovaInforme&" + jQuery.param(rowData),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result == true) {
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : 'tb=fce_clubsfilials&estat=7&nomFitxa=c_gestio_torneig_admin_e_1.xml&dadesCercar=gestio_torneig_admin_e_1.xml',
                    success  : function(data) {           
                        dibuixaGrid(data, 'avaluats');
                    }
                  });
                  
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : 'tb=fce_clubsfilials&estat=5&nomFitxa=c_gestio_torneig_admin_d_1.xml&dadesCercar=gestio_torneig_admin_d_1.xml',
                    success  : function(data) {           
                        dibuixaGrid(data, 'enRevisio');
                    }
                  });
                } else {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                }
              }
            });
          });
          break;
        case 'noValidisTorneig':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .noValidisTorneig').on('click', function () {
            var esborra = confirm("Vol rebutjar el torneig sel·leccionat?");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/controllerTorneig.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=noValidisTorneig&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    jQuery.ajax({
                      type     : 'POST',
                      cache    : false,
                      url      : urlB + GMvers + "/conn/resultatCerca.php",
                      data     : 'tb=fce_clubsfilials&estat=0&nomFitxa=c_gestio_torneig_admin_a_1.xml&dadesCercar=gestio_torneig_admin_a_1.xml',
                      success  : function(data) {           
                          dibuixaGrid(data, 'pendentsVerificar');
                      }
                    });
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'validaTorneig':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .validaTorneig').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
            var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
            var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
            jQuery.ajax({
              url: urlB + GMvers + "/conn/controllerTorneig.php",
              type: 'POST',
              crossDomain: 'true',
              data: "operacio=validaTorneig&" + jQuery.param(rowData),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result == true) {
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : 'tb=fce_clubsfilials&estat=2&nomFitxa=c_gestio_torneig_admin_b_1.xml&dadesCercar=gestio_torneig_admin_e_1.xml',
                    success  : function(data) {           
                        dibuixaGrid(data, 'verificats');
                    }
                  });
                  
                  jQuery.ajax({
                    type     : 'POST',
                    cache    : false,
                    url      : urlB + GMvers + "/conn/resultatCerca.php",
                    data     : 'tb=fce_clubsfilials&estat=0&nomFitxa=c_gestio_torneig_admin_a_1.xml&dadesCercar=gestio_torneig_admin_d_1.xml',
                    success  : function(data) {           
                        dibuixaGrid(data, 'pendentsVerificar');
                    }
                  });
                } else {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                }
              }
            });
          });
          break;
        case 'deleteSelectedRow':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .deleteSelectedRow').on('click', function () {
            var esborra = confirm("Vol esborrar els registres seleccionats?");
            if(esborra == true) {
              var obJQ = jQuery('#' + targetId + ' .cont_grid');
              var selectedrowindex = jQuery(obJQ).jqxGrid('getselectedrowindex');
              var idRow = jQuery(obJQ).jqxGrid('getrowid', selectedrowindex);
              var rowData = jQuery(obJQ).jqxGrid('getrowdatabyid', idRow);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                crossDomain: 'true',
                data: "operacio=esborra&" + jQuery.param(rowData),
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    var commit = jQuery(obJQ).jqxGrid('deleterow', idRow);
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
          });
          break;
        case 'uncheckRenovacio':
          var classCSS = 'uncheckRenovacio';
          var nomCampEdit = 'llicenciaRenovada';
          var estatJug = '0';
          var destinationGrid = 'norenovats';
        case 'checkRenovacioArbitre':
          if(typeof classCSS == 'undefined') {
            var classCSS = 'checkRenovacioArbitre';
            var nomCampEdit = 'llicenciaArbitre';
            var estatJug = '1';
            var destinationGrid = 'actius'; 
          }
        case 'checkRenovacioRetransmissor':
          if(typeof classCSS == 'undefined') {
            var classCSS = 'checkRenovacioRetransmissor';
            var nomCampEdit = 'retransmissor';
            var estatJug = '2';
            var destinationGrid = 'actius'; 
          }
        case 'checkRenovacio':
          if(typeof classCSS == 'undefined') {
            var classCSS = 'checkRenovacio';
            var nomCampEdit = 'llicenciaRenovada';
            var estatJug = '1';
          
            if(jQuery("#renovats .cont_grid").length == 0) {
              var destinationGrid = 'renovats_SP'; 
            } else {
              var destinationGrid = 'renovats'; 
            }
          }
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .' + classCSS + '').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            
            var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
            deleteRowsId = [];
            for(var i = 0; i < rowIndexes.length; i++) {
              
              var rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
              deleteRowsId.push(jQuery(obJQ).jqxGrid('getrowid', rowIndexes[i]));
              
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                crossDomain: 'true',
                data: "idJugador=" + rowData['idJugador'] + "&" + nomCampEdit + "=" + estatJug + "&fitxaDades=" + rowData['fitxaDades'] ,
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result != true) {
                    commit(false);
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
              
              if(destinationGrid == 'norenovats') {
                if(rowData['estat'] == 0) {
                  jQuery("#noactius .cont_grid").jqxGrid('addrow', rowData['idJugador'], rowData, 'top');
                } else {
                  jQuery("#norenovats .cont_grid").jqxGrid('addrow', rowData['idJugador'], rowData, 'top');
                }
              } else {
                if(jQuery("#" + destinationGrid + " .cont_grid").length > 0) {
                  jQuery("#" + destinationGrid + " .cont_grid").jqxGrid('addrow', rowData['idJugador'], rowData, 'top');
                }
              }
              
              
            }
            jQuery(obJQ).jqxGrid('clearselection');
            for(var i = 0; i < deleteRowsId.length; i++) {
              jQuery(obJQ).jqxGrid('deleterow', deleteRowsId[i]);
            }
            delete classCSS;
          });
          break;
        case 'acceptaNou':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .acceptaNou').on('click', function () {
            var esborra = confirm("Vol acceptar la nova fitxa federativa?");
            if(esborra != true) return;
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
            deleteRowsId = [];
            for(var i = 0; i < rowIndexes.length; i++) {
          
              var rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
              deleteRowsId.push(jQuery(obJQ).jqxGrid('getrowid', rowIndexes[i]));
              
              var dt = new Date();
              var dataTram = "&dataRenovacio=" + encodeURI(dt.toYMD()) + "&dataFitxa=" + encodeURI(dt.toYMD());
                
              if(rowData['llicencia15mesos'] == 0 && autoTramet == 0) {
                estat = 0;
              } else {
                estat = 1;
              }
              
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                rowData: rowData,
                crossDomain: 'true',
                data: "idJugador=" + rowData['idJugador'] + "&perof=1&llicenciaRenovada=1&tramitat=1&clubDesti=-1&estat=" + estat + "&fitxaDades=" + rowData['fitxaDades'] + dataTram,
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result != true) {
                    commit(false);
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  } else {
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",
                      type: 'POST',
                      crossDomain: 'true',
                      data: "remitentClub=348&idClub=" + this.rowData['clubDesti'] + "&assumpte=9&contingut=" + encodeURI("La Federació Catalana d'Escacs ha acceptat la creació de la llicència federativa del jugador :"+this.rowData['nomllarg']+""),
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              });
            }
            jQuery(obJQ).jqxGrid('clearselection');
            for(var i = 0; i < deleteRowsId.length; i++) {
              jQuery(obJQ).jqxGrid('deleterow', deleteRowsId[i]);
            }
          });
          break;
		  
        case 'acceptaTraspas':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .acceptaTraspas').on('click', function () {
            var esborra = confirm("Vol acceptar els traspassos seleccionats?");
            if(esborra != true) return;
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
            deleteRowsId = [];
            for(var i = 0; i < rowIndexes.length; i++) {
              var rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
              deleteRowsId.push(jQuery(obJQ).jqxGrid('getrowid', rowIndexes[i]));
              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                crossDomain: 'true',
                rowData : rowData,
                estatJug: estatJug,
                data: "idJugador=" + rowData['idJugador'] + "&perof=2&acceptaTraspas=1&tramitat=1&fitxaDades=" + rowData['fitxaDades'] ,
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result != true) {
                    commit(false);
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  } else {
                    var assumpte = 7
                    var contingut = "La Federació Catalana d'Escacs ha acceptat el fitxatge del següent jugador :" + this.rowData['nomLlarg'];
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",
                      type: 'POST',
                      crossDomain: 'true',
                      data: "remitentClub=348&idClub=" + this.rowData['clubDesti'] + "&assumpte=" + assumpte + "&contingut=" + encodeURI(contingut),
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              });
            }
            jQuery(obJQ).jqxGrid('clearselection');
            for(var i = 0; i < deleteRowsId.length; i++) {
              jQuery(obJQ).jqxGrid('deleterow', deleteRowsId[i]);
            }
          });
          break;
        case 'denegaTraspas':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .denegaTraspas').on('click', function () {
            var esborra = confirm("Vol rebutjar els traspassos seleccionats?");
            if(esborra != true) return;
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
            deleteRowsId = [];
            for(var i = 0; i < rowIndexes.length; i++) {
          
              var rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
              deleteRowsId.push(jQuery(obJQ).jqxGrid('getrowid', rowIndexes[i]));

              jQuery.ajax({
                url: urlB + GMvers + "/conn/sincJqxgrid.php",
                type: 'POST',
                crossDomain: 'true',
                rowData : rowData,
                estatJug: estatJug,
                data: "idJugador=" + rowData['idJugador'] + "&acceptaTraspas=0&clubDesti=-1&fitxaDades=" + rowData['fitxaDades'] ,
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result != true) {
                    commit(false);
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  } else {
                    var assumpte = 8
                    var contingut = "La Federació Catalana d'Escacs ha rebutjat el fitxatge del següent jugador :" + this.rowData['nomLlarg'];

                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",
                      type: 'POST',
                      crossDomain: 'true',
                      data: "remitentClub=348&idClub=" + this.rowData['clubDesti'] + "&assumpte=" + assumpte + "&contingut=" + encodeURI(contingut),
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              });
            }
            jQuery(obJQ).jqxGrid('clearselection');
            for(var i = 0; i < deleteRowsId.length; i++) {
              jQuery(obJQ).jqxGrid('deleterow', deleteRowsId[i]);
            }
          });
          
          break;
        case 'helper':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .helper').on('click', function () {
            var fitxa = jQuery(this).attr('fitxa');
            var updateMethod = jQuery(this).attr('updateMethod');
            GMDCercaPop(fitxa, targetId, defaults, updateMethod,1);
          });
          break;
        case 'helper2':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .helper2').on('click', function () {
            var fitxa = jQuery(this).attr('fitxa');
            var updateMethod = jQuery(this).attr('updateMethod');
            GMDCercaPop(fitxa, targetId, defaults, updateMethod,2);
          });
          break;		  
        case 'addEmptyRowPop':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .addEmptyRowPop').on('click', function () {
            var fitxa = jQuery(this).attr('fitxa');
            GMDNovaFitxaPop(fitxa, targetId, defaults);
          });
          break;
        case 'exportToXLS':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .' + metodesButtons[j] + '').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery(obJQ).jqxGrid('exportdata', 'xls', 'exportData', true, null, false, urlB + GMvers + "/conn/save-file.php");
          })
          break;
        case 'exportToXLSHidden':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .' + metodesButtons[j] + '').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery(obJQ).jqxGrid('exportdata', 'xls', 'exportData', true, null, true, urlB + GMvers + "/conn/save-file.php");
          })
          break;		  
        case 'exportToHTML':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .' + metodesButtons[j] + '').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery(obJQ).jqxGrid('exportdata', 'html', 'exportData', true, null, false, urlB + GMvers + "/conn/save-file.php");
          })
          break;
        case 'exportToPDF____':
		alert('#' + targetId + ' .' +contButton[i].position + '_cont_grid .exportToPDF');
            jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .exportToPDF').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            jQuery(obJQ).jqxGrid('exportdata', 'html', 'exportData', false, null, false, urlB + GMvers + "/conn/save-file.php?pdf=true&");
          })
          break;
        case 'exportTophpPDF____':
	        jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .exportTophpPDF').on('click', function () {
		       var grup = document.getElementsByName("idGrup")[0];
			   var idGrup = jQuery("#fitxa_cerca select[name='idGrup']").val();
			   var ronda = jQuery("#fitxa_cerca select[name='ronda']").val();
			   var idClub = jQuery("#fitxa_cerca select[name='idClub']").val();
			   location.href= urlB + GMvers + "/conn/lliga-calendari-pdf.php?grup="+idGrup+"&ronda="+ronda+"&idClub="+idClub;
          })
          break;		 		  
        case 'checkIncripcioTorneig':
          jQuery('#' + targetId + ' .' + contButton[i].position + '_cont_grid .checkIncripcioTorneig').on('click', function () {
            var obJQ = jQuery('#' + targetId + ' .cont_grid');
            var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
            deleteRowsId = [];
            for(var i = 0; i < rowIndexes.length; i++) {
          
              deleteRowsId.push(jQuery(obJQ).jqxGrid('getrowid', rowIndexes[i]));
              var rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
              jQuery.ajax({
                url: urlB + GMvers + "/conn/desar.php",
                currentGrid: obJQ,
                row: jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]),
                type: 'POST',
                crossDomain: 'true',
                data: "crear=2&carrec=Candidat&idJugador=" + rowData['idJugador'] + "&idTorneig=" + rowData['idTorneig'] + "&nomFitxa=" + rowData['fitxaDades'] ,
                ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
                success: function(data) {
                  resultat = jQuery.parseJSON(data);
                  if(resultat.result == true) {
                    this.row.idParell = resultat.id;
                    jQuery("#actius .cont_grid").jqxGrid('addrow', this.row.idParell, this.row, 'top');
                  } else {
                    alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                  }
                }
              });
            }
            jQuery(obJQ).jqxGrid('clearselection');
            for(var i = 0; i < deleteRowsId.length; i++) {
              jQuery(obJQ).jqxGrid('deleterow', deleteRowsId[i]);
            }
          });
          break;
		  default:
      }
    }
  }

  // PUJAR Comptabilitat
  var inputComptabilitat = document.getElementById('updateCompatibilitat');
  //var anycomp = document.getElementByName('anycomp');
  //console.log("a " + anycomp);
  //var select = document.getElementById('language');
  //var value = select.options[select.selectedIndex].value;
  
  
  //alert(anycomp);


  if(inputComptabilitat !== null) {
    inputComptabilitat.addEventListener('change', function(e) {
      var file = this.files[0];
      var xhr = new XMLHttpRequest();
      xhr.file = file; // not necessary if you create scopes like this
      xhr.addEventListener('progress', function(e) {
          var done = e.position || e.loaded, total = e.totalSize || e.total;
          console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
      }, false);
      if ( xhr.upload ) {
          xhr.upload.onprogress = function(e) {
              var done = e.position || e.loaded, total = e.totalSize || e.total;
              console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
          };
      }
      xhr.onreadystatechange = function(e) {
          if ( 4 == this.readyState ) {
              console.log(['xhr upload complete', e]);
              if(xhr.status == 202) {
                inputComptabilitat.value = '';
                jQuery('#fitxa_cerca form').submit();
	             resposta = jQuery.parseJSON(xhr.responseText);
	             alert("Fitxer Importat: " + resposta.error);
              } else {
                resposta = jQuery.parseJSON(xhr.responseText);
                alert("ERROR (" + xhr.status + "): " + xhr.statusText + ".\n" + resposta.error);
              }
              xhr = null;
              
          }
      };
      xhr.open('post', urlB + GMvers + "/conn/parseFileComp.php", true);
      
      var fd = new FormData;
      fd.append('comptabilitat', file);
      xhr.send(fd);
      jQuery('.label-updateCompatibilitat').remove();
      
    }, false);
  }
  
   if (orderdata>0) {
    jQuery('#' + targetId + ' .cont_grid').jqxGrid({ showsortcolumnbackground: false}); 
    if (ordesc>0) jQuery('#' + targetId + ' .cont_grid').jqxGrid('sortby', 'dataInici', 'desc'); 
    if (orasc>0) jQuery('#' + targetId + ' .cont_grid').jqxGrid('sortby', 'dataInici', 'asc'); 
	//jQuery('#' + targetId + ' .cont_grid').jqxGrid('sortby', 'dataInici', 'desc');
  } 
 
}

function GMDCercaForm(xmlCform, tagdest, destGrid) {
  switch(xmlCform) {
    case 'c_':
      return;
      break;
    case 'c_torneig_info':
      return GMDLoadForm($_GET.serialize(), 'c_f_torneig_info', 'fitxa_cerca');
    break;
    case 'c_torneig_info_2':
      return GMDLoadForm($_GET.serialize(), 'c_f_torneig_info_2_individual', 'fitxa_cerca');
    break;
    case 'c_torneig_info_equips_2':
      return GMDLoadForm($_GET.serialize(), 'c_f_torneig_info_2_equips', 'fitxa_cerca');
    break;
    case 'c_gestio_jugadors':
      return GMDLoadForm($_GET.serialize(), 'c_f_gestio_jugadors_club', 'fitxa_cerca');
    break;
    case 'c_gestio_jugadors_fce':
      return GMDLoadForm($_GET.serialize(), 'c_gestio_jugadors', 'fitxa_cerca');
    break;
    case 'c_gestio_arbitres':
      return GMDLoadForm($_GET.serialize(), 'c_f_gestio_arbitres_fce', 'fitxa_cerca');
    break;
    case 'c_gestio_retransmissors':
      return GMDLoadForm($_GET.serialize(), 'c_f_gestio_retransmissors_fce', 'fitxa_cerca');
    break;
    case 'c_incripcio_arbitre':
      return GMDLoadForm($_GET.serialize(), 'c_f_licitacio_arbitres_fce', 'fitxa_cerca');
    break;
    case 'c_incripcio_retransmissor':
      return GMDLoadForm($_GET.serialize(), 'c_f_licitacio_retransmissors_fce', 'fitxa_cerca');
    break;
    case 'c_gestio_torneig_admin':
      return GMDLoadForm($_GET.serialize(), 'c_gestio_torneig_admin', 'fitxa_cerca');
    break;
    case 'c_gestio_licitacions':
      return GMDLoadForm($_GET.serialize(), 'c_gestio_licitacions', 'fitxa_cerca');
    break;
    case 'c_gestio_ordre_forces_club':
      return GMDLoadForm($_GET.serialize(), 'c_gestio_ordre_forces_club', 'fitxa_cerca');
    break;
    case 'c_lliga_actes':
      return GMDLoadForm($_GET.serialize(), 'c_lliga_actes', 'fitxa_cerca');
    break;
    case 'c_lliga_resultats':
      return GMDLoadForm($_GET.serialize(), 'c_lliga_resultats', 'fitxa_cerca');
    break;
    case 'c_lliga_calendari':
      return GMDLoadForm($_GET.serialize(), 'c_lliga_calendari', 'fitxa_cerca');
    break;
    case 'c_lliga_no_presentats':
      return GMDLoadForm($_GET.serialize(), 'c_lliga_no_presentats', 'fitxa_cerca');
    break; 
    case 'c_inscripcio_2':
	  var idt=$_GET["idTorneig"];
      return GMDLoadForm($_GET.serialize(), 'c_f_inscripcio', 'fitxa_cerca','',idt);	  
    break;
  }
  
  if(!destGrid) {
    destGrid = 'jqxgrid';
  }
  
  jQuery.ajax(
    {
      url: urlB + GMvers + "/conn/cerca.php",
      type: 'POST',
      crossDomain: 'true',
      data: "finfo="+xmlCform + "&" + $_GET.serialize(),
      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
      success: function(resultat) {

        dades = jQuery.parseJSON(resultat)
        jQuery('#'+tagdest).html(dades.html);
        jQuery('.boto_formulari').button();
        jQuery('#' + tagdest + ' form').on('submit', function(e) {
          e.preventDefault();
          jQuery.ajax({
              type     : 'POST',
              cache    : false,
              url      : '' + urlXML + jQuery(this).attr('action') + '',
              data     : jQuery(this).serialize(),
              success  : function(data) {
                  dibuixaGrid(data, destGrid);
              }
          });
        });
        if(dades.autoSubmit != 'false') {
          jQuery('#' + tagdest + ' form').trigger('submit');
        }
      }
    }
  );
}

/**
* Function  GMDLoadForm
*
* Gestiona la crida ajax a llistes i formularis de dades segons el rol
*
* @data juliol 2014
* @author     mcrit sl
* @version    1.0
*
* @param (String) table taula d'on recuperar les dades
* @param (String) where condició sql sobre table (sense WHERE)
* @param (String) xmlform xml template per recuperar dades a mostrar
* @param (String) tagdest id del <div> on deixar el resultat
* @param (String) ths permet que al seleccionar un element del jqxGrid es mostri la fitxa d'aquell id
* @param (String) dlg per defecte 0 = llista,  1 = fitxa
* @param (String) w width de la llista
*
* @return dialeg jQuery amb fitxa / taula llista amb jqxGrid
*
*/

var Zdefault=new google.maps.LatLng(42.30-0.60, 1.99);var Zzoom=7;
var MARK_A=Array(10),MARC_A=Array(10);var numsa=-1,PosClick=-1;
function createMap(mapa) { 

  var bounds = new google.maps.LatLngBounds();var NoZero=false;var nums=0;
  var ds1t=0,dst2=0,fzoom=14,minlat=999.9,maxlat=-999.9,minlng=999.9,maxlng=-999.9;
  for (var i = 0; i < mapa.markers.length; i++) {  
   if(minlat>parseFloat(mapa.markers[i].lat) && parseFloat(mapa.markers[i].lat)!=0) minlat=parseFloat(mapa.markers[i].lat);
   if(minlng>parseFloat(mapa.markers[i].lng) && parseFloat(mapa.markers[i].lng)!=0) minlng=parseFloat(mapa.markers[i].lng);
   if(maxlat<parseFloat(mapa.markers[i].lat) && parseFloat(mapa.markers[i].lat)!=0) maxlat=parseFloat(mapa.markers[i].lat);
   if(maxlng<parseFloat(mapa.markers[i].lng) && parseFloat(mapa.markers[i].lng)!=0) maxlng=parseFloat(mapa.markers[i].lng);
   if(parseFloat(mapa.markers[i].lat)!=0) {NoZero=true;nums++;}
   if(parseFloat(mapa.markers[i].lng)!=0) NoZero=true;
  }
  bounds.extend(new google.maps.LatLng(minlat-0.00001,minlng-0.00001));
  bounds.extend(new google.maps.LatLng(maxlat+0.00001,maxlng+0.00001));
  dst1=maxlat-minlat;
  dst2=maxlng-minlng;
  if(dst1>0.0014 || dst2>0.0014) fzoom=13;
  centre = new google.maps.LatLng(minlat + (maxlat-minlat)/2 ,minlng + (maxlng-minlng)/2); 
  if(NoZero==false) {centre=Zdefault;fzoom=Zzoom;}  
  
  var opcionsMapa = {
    zoom: mapa.zoom,
    mapTypeId: google.maps.MapTypeId.ROAD,
	streetViewControl: true,
    center: centre
  }
  
  var map = new google.maps.Map(document.getElementById('canvas_' + mapa.id + ''), opcionsMapa);
  map.centre = centre;
  google.maps.event.trigger(map, 'resize');
  map.setCenter(map.centre);
  if(NoZero==true && nums>1) {map.fitBounds(bounds);}
  map.setZoom(fzoom);

  jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(map.centre);
  });
  
  map.divId = mapa.id;
  for(var j = 0; j < mapa.markers.length; j++) {
    redScCreateMarker(map, mapa.markers[j],j);
  }
}

var SVaddress="";
function createMarker(mapa, marcador,j) {

  var imagemarker01,nImg;
  nImg='../../components/com_fce/images/pin_blue.png';
  if(marcador.title!="Seu Social") nImg='../../components/com_fce/images/pin_red.png';
   imagemarker01 = new google.maps.MarkerImage( nImg, null, null, new google.maps.Point(16,32) ); 

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(parseFloat(marcador.lat) , parseFloat(marcador.lng)),
    map: mapa,title: marcador.title,draggable: marcador.editable,icon: imagemarker01
  });
  
  MARK_A[j]=marker;MARC_A[j]=marcador;if(j>numsa) numsa=j;
  if(marcador.geocoder != '') {
    var inputsGeocoder = marcador.geocoder.split('+');
    for(var i = 0; i < inputsGeocoder.length; i++) {
      jQuery('#' + marcador.idDestForm + ' input[name="' + inputsGeocoder[i] + '"]').change(function() { 
        var address = '';
        for(var j = 0; j < inputsGeocoder.length; j++) {
          address += jQuery('#' + marcador.idDestForm + ' input[name="' + inputsGeocoder[j] + '"]').val() + ', ';
        }
		var adl=address.slice(0,address.length-2);
		var pi=adl.indexOf("(");var pf=adl.indexOf(")");
		if(pi>=0 && pf>0) {cadenai=adl.substring(0,pi);cadenaf=adl.substring(pf+1,adl.length);adl=cadenai+cadenaf;}
        geocoderGoogleMaps.geocode( { 'address': adl}, function(results, status) {
		var local=false;
          if (status == google.maps.GeocoderStatus.OK) {
		    if(results[0].geometry.location_type==google.maps.GeocoderLocationType.ROOFTOP) local=true;
            mapa.setCenter(results[0].geometry.location);
            mapa.centre = mapa.getCenter();mapa.setZoom(14);
            marker.setPosition(results[0].geometry.location);
            var posicio = marker.getPosition();
			SetVals(posicio.lat(),posicio.lng(),marcador,mapa);
          //  jQuery('input[name="' + marcador.campLat + '"]').val(posicio.lat());
           // jQuery('input[name="' + marcador.campLng + '"]').val(posicio.lng());
           // jQuery('#' + marcador.idDestForm + ' input[name="' + marcador.campLat + '"]').val(posicio.lat());
           // jQuery('#' + marcador.idDestForm + ' input[name="' + marcador.campLng + '"]').val(posicio.lng());
          } 
		  if(local==false) {
			mapa.setCenter(Zdefault);mapa.setZoom(Zzoom);
            var cerror="No s'ha pogut localitzar l'adreça a Google.\n Solucions:\n\n";
            cerror=cerror+"1) Escrigui l'adreça segons el format google.\n";			
			cerror=cerror+"2) Utilitzi els símbols '()' per incloure comentaris.\n";
			cerror=cerror+"3) Seleccioni i desplaci la icona al seu lloc.\n";
            cerror=cerror+"4) Faci clic en el camp 'adreça' i desprès clic sobre el mapa.";		
		    if(SVaddress!=address.slice(0,address.length-2)) alert(cerror);
            SVaddress=address.slice(0,address.length-2);marcador.lat=0;marcador.lng=0;
			marker.setPosition(new google.maps.LatLng(parseFloat(0) , parseFloat(0)));
 	        SetVals(0,0,marcador,mapa);
          //  jQuery('input[name="' + marcador.campLat + '"]').val(0);
          //  jQuery('input[name="' + marcador.campLng + '"]').val(0);
          //  jQuery('#' + marcador.idDestForm + ' input[name="' + marcador.campLat + '"]').val(0);
          //  jQuery('#' + marcador.idDestForm + ' input[name="' + marcador.campLng + '"]').val(0);
		
           }			
        });
      });
    }
  }

  jQuery('input[name="adreca"]').click(function(e) {PosClick=0;});
  jQuery('input[name="seuSocial"]').click(function(e) {PosClick=0;});
  jQuery('input[name="localJoc"]').click(function(e) {PosClick=1;});
  
  google.maps.event.addListener(mapa, 'click', function(e) {
    if(PosClick>numsa || PosClick==-1) return;
    MARK_A[PosClick].setPosition(new google.maps.LatLng(e.latLng.lat(),e.latLng.lng()));
    SetVals(e.latLng.lat(),e.latLng.lng(),MARC_A[PosClick],mapa);PosClick=-1;
  });
	
  google.maps.event.addListener(marker, 'dragend', function(e) {
    SetVals(e.latLng.lat(),e.latLng.lng(),marcador,mapa);
     //jQuery('input[name="' + marcador.campLat + '"]').val(e.latLng.lat());
    //jQuery('input[name="' + marcador.campLng + '"]').val(e.latLng.lng());
    //jQuery('#' + mapa.divId + ' input[name="' + marcador.campLat + '"]').val(e.latLng.lat());
    //jQuery('#' + mapa.divId + ' input[name="' + marcador.campLng + '"]').val(e.latLng.lng());
  });
}

function SetVals(lat,lng,marca,mapa) {
  jQuery('input[name="' + marca.campLat + '"]').val(lat);
  jQuery('input[name="' + marca.campLng + '"]').val(lng);
  jQuery('#' + mapa.divId + ' input[name="' + marca.campLat + '"]').val(lat);
  jQuery('#' + mapa.divId + ' input[name="' + marca.campLng + '"]').val(lng);
}

function redScCreateMarker(mapa, marcador,j) {
  return function() {
    createMarker(mapa, marcador,j);
  }();
}

function ClickPagament() {
  
   jQuery('#grup-confirm').css('display', 'inline');	
   jQuery('#grup-pagament').css('display', 'none');	
   jQuery('#creaInscripcio').css('display', 'none');
   jQuery('#pay_order_id').css('display', 'none');
   jQuery('#pagament').css('display', 'none');
   var order = document.getElementById('pay_order_id');  
   var newurl='https://escacs.cat/' + PrefixUrl + 'components/com_fce/gmvw20/conn/passSend.php?order='+ order.value;
   document.getElementById('iframe-confirm').src = newurl;  
 }

function GMDLoadForm(where, xmlform, tagdest, defaults, fixt="", zz="",fixNom="",fixNotes="",fixPreus="") {

 //Especific Inscripció per carregar valors de fce_torneigs 
 var p1="",n1="",p2="",n2="",list1=""; 

 if (xmlform=="c_f_inscripcio"){
   p1="fce_jugadors_inscr.nomComplet AS nomComplet";
   n1="'" + fixNom + "' AS nomComplet"; 
   p2="fce_jugadors_inscr.Notes1 AS Notes1";
   n2="'" + fixNotes + "' AS Notes1";   
   list1=fixPreus;
 }
 
 jQuery.ajax( {
    url: urlB + GMvers + "/conn/info.php",
    type: "POST",
    crossDomain: 'true',
    data: "finfo="+xmlform + "&" + where + "&p1=" + p1 + "&n1=" + n1 + "&p2=" + p2 + "&n2=" + n2 + "&list1=" + list1,
    ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
    success: function(dades) {
      var resultat = jQuery.parseJSON(dades); 
	
	  if(fixNotes!="") resultat.html=resultat.html.replace("NOVANOTES",fixNotes);		  
	  if(fixPreus!="") resultat.html=resultat.html.replace("camp=\"preus\" tipus=\"select\" value=\"\" width=\"50\" exacte=\"exacte\" llista=\"\"","camp=\"preus\" tipus=\"select\" value=\"\" width=\"50\" exacte=\"exacte\" llista=\""+ fixPreus +"\"");
	  if(fixNom!="") resultat.html=resultat.html.replace("NOVAETIQUETA",fixNom)		  
	  if(fixt) {
		if(fixt!="") {  
	      resultat.html=resultat.html.replace("name='idTorneig' value=\"","name='idTorneig' value=\""+fixt);
		}
	  }
	
      delete dades;

      jQuery('#'+tagdest).html(decodeURIComponent(resultat.html));

      jQuery('.cercaIntegrada').each(function(e) {
        jQuery.ajax({
            type      : 'POST',
            cache     : false,
            url       : '' + urlXML + jQuery(this).attr('action') + '',
            data      : jQuery(this).serialize(),
            targetGrid: jQuery(this).attr('target'),
            success  : function(data) {
              dibuixaGrid(data, this.targetGrid);
              delete data;
            }
        });
      });
      jQuery('#' + tagdest + ' form.cercaIntegrada').remove();
      
      jQuery("input.btn.export_fitxa").click( function(e) {
        exportaPDFServei('fitxa-jugador.pdf', jQuery('#printableTable').html(), ['fce.css']);
      })
       jQuery("input.btn.export_mutua").click( function(e) {
        exportaPDFServei('llistat-mutua_', jQuery('#printableTable').html(), ['fce.css']);
      })
      
      jQuery('#' + tagdest + ' .enviaMissatgeFrm').on('click', function () {
		var obJQ;if(jQuery('#clubsPerMissatge .cont_grid').length >0)obJQ = jQuery('#clubsPerMissatge .cont_grid');
		else obJQ = jQuery('#clubsPerMissatgeAdm .cont_grid');
        var rowIndexes = jQuery(obJQ).jqxGrid('getselectedrowindexes');
        var rowData,clubs="348";//Envia a l'administrador FCE codi 348 i ...
        for(var i = 0; i < rowIndexes.length; i++){
          rowData = jQuery(obJQ).jqxGrid('getrowdata', rowIndexes[i]);
          clubs+=";"+rowData['idClub'];
        }
		obJQ = jQuery('#modal_container form').serialize();
		var cmpsAux=obJQ.split("&");
		var i,qui="";if((i=searchStringInArray("idClub",cmpsAux)) != -1)qui=cmpsAux[i].split("=")[1];
		var subject="";if((i=searchStringInArray("idAssumpte",cmpsAux)) != -1)subject=cmpsAux[i].split("=")[1];
		var message="";if((i=searchStringInArray("contingut1",cmpsAux)) != -1)message=cmpsAux[i].split("=")[1];
        enviaMissatge(qui,clubs,subject,message);
      });

      jQuery('#' + tagdest + ' form:not(.refresca, .desarNou, #formNouJugador)').on('submit', function(e){
		  
        var act='' + jQuery(this).attr('action') + '';
		 
        e.preventDefault();
        jQuery.ajax({
            type     : 'POST',
			crossDomain: true,
            cache    : false,
            url      : '' + urlXML + jQuery(this).attr('action') + '',
            data     : jQuery(this).serialize(),
            success  : function(data) {

              var resultat = jQuery.parseJSON(data);
              var form = jQuery(this).get(0);
              if(form.querySelector('input.actualitzaCercador')) {
                jQuery('#fitxa_cerca form').submit();
              }
              alert(resultat.resultat);
            }.bind(this),
            error : ajaxErrorCb
        });
      });
      
      jQuery('input[type=button].refresca').click( function(){
        jQuery.ajax({
            type     : 'POST',
            cache    : false,
            url      : '' + urlXML + 'desar.php',
            data     : jQuery('#' + tagdest + ' form.refresca').serialize(),
            success  : function(data) {
              var resultat = jQuery.parseJSON(data);
              alert(resultat.resultat);
            },
           error : ajaxErrorCb
        });
      });
      
    // Modal Bootstrap
    jQuery('#modal_container').modal('show');
    setTimeout(function Esp() {
      for(var i = 0; i < resultat.maps.length; i++) {
        var htmlInsert = '';
        for(var j = 0; j < resultat.maps[i].markers.length; j++) {
          htmlInsert += "<input type='hidden' name='" + resultat.maps[i].markers[j].campLat + "' value='" + resultat.maps[i].markers[j].lat + "' />\n";
          htmlInsert += "<input type='hidden' name='" + resultat.maps[i].markers[j].campLng + "' value='" + resultat.maps[i].markers[j].lng + "' />\n";
          resultat.maps[i].markers[j].idDestForm = tagdest;
        }
        htmlInsert += "<div id='canvas_" + resultat.maps[i].id + "' class='canvas_google_maps'></div>"
        jQuery('#' + resultat.maps[i].id + '').html(htmlInsert);    
        // Pot donar errors amb més d'un mapa. Si fos el cas, cal crear una funció callback per reduir l'scope
         createMap(resultat.maps[i]);
      }
    },750);
 
      jQuery('#modal_container').modal('show');
	 
      jQuery('#modal_container').on('hidden.bs.modal', function (e) {
        jQuery('#modal_container').remove();
      });
	  
      jQuery('#modal_container').on('shown.bs.modal', function (e) {
        for(var i = 0; i < resultat.maps.length; i++) {createMap(resultat.maps[i]);}
	   });	  
	  
      delete resultat; 
      
      jQuery('#' + tagdest + ' form').find('input[type=submit]').on('click', function() {
        jQuery('#modal_container .alert-danger').css('display', 'none');
        var errors = jQuery('#modal_container :invalid');
        if(errors.length > 0) {
          var missatgeError = '<div><strong>Alerta!</strong><p>Hi ha errors de validació als següents camps:</p><ul>';
          
          jQuery('#modal_container .alert-danger').css('display', 'block');
          for(var i = 0; i < errors.length; i++) {
            var contenidorTab = jQuery(errors[i]).parents('.tab-pane');
            var campError = jQuery(errors[i]).siblings('span').text();
            if(campError == '') continue;
            
            if(contenidorTab.length > 0) {
              var idLink = '#link_' + jQuery(contenidorTab[0]).attr('id') + '';
              missatgeError += '<li>El camp <strong>' + campError  + '</strong> de la pestanya <strong>' + jQuery(idLink).text() + '</strong>.</li>';
            } else {
              missatgeError += '<li>El camp <strong>' + campError +'</strong></li>';
            }
          }
          missatgeError += '</ul></div>';
          jQuery('#modal_container .alert-danger').html(missatgeError);
        }

      });
    
    // Finestra Nou Registre Jugador - carrec - Inscripció
    jQuery('#' + tagdest + ' form.desarNou').on('submit', function(e) {
      e.preventDefault();
      formKeyVal = jQuery('#' + tagdest + ' form.desarNou').serializeArray();

	  try {var obJGrid = jQuery('#' + defaults.sourceGrid + ' .cont_grid');} catch(e) {var obJGrid="";}
	
      var addcad="";var timestamp="";
	  if (xmlform=="c_f_inscripcio"){
	    var data = new Date(Date.now());
        var month = '' + (data.getMonth() + 1);
        var day = '' + data.getDate();
        var year = '' + data.getFullYear();
		var hors = '' + data.getHours();
		var min = '' + data.getMinutes();
		var sec = '' + data.getSeconds();
        if (month.length == 1)  month = "0" + month;
        if (day.length == 1) day = "0" + day;
        if (hors.length == 1) hors = "0" + hors;
        if (min.length == 1) min = "0" + min;
        if (sec.length == 1) sec = "0" + sec;
		timestamp=year+''+month+''+day+''+hors+''+min+''+sec;
		addcad="&cadsend=" +timestamp;
		//urlB=urlBIn;
      }
	  //???x
      try {var sg=defaults.sourceGrid;} catch(e) {var sg="";}

      jQuery.ajax({
        url: urlB + GMvers + "/conn/desar.php",
        type: 'POST',
        defaults: defaults,
        //sourceGridId : defaults.sourceGrid, 
        sourceGridId : sg, 		
        obJGrid: obJGrid,
        crossDomain: 'true',
        data: "crear=2&" + jQuery('#' + tagdest + ' form.desarNou').serialize() + addcad,
        error : ajaxErrorCb,
        success: function(data) {

          var result = jQuery.parseJSON(data);
		  if (result.taula=="fce_jugadors_inscr") {
			if (result.missatge.indexOf("Error: ")>=0) alert(result.missatge);
			var order = document.getElementById('pay_order_id');
			order.value=result.order;
			var email = document.getElementById('pay_email');
			email.value=result.email;			
			var phone = document.getElementById('pay_phone');
			phone.value=result.phone.replace("-","|");
			var stamp = document.getElementById('pay_stamp');
			stamp.value=timestamp;
		    var amount = document.getElementById('pay_amount');
			amount.value=result.amount;
			if (result.missatge.indexOf("Error: ")<0) ClickPagament();
			return;		
		  }
		  
          var FMiss=true;if(result.cmpId=="idCarrec") FMiss=false;
		  var fs="assumpte=6&idJugador=";if(result.cmpId=="idTorneig") fs="assumpte=25&idTorneig=";
		  if(FMiss==true) {
          jQuery.ajax({ url: urlB + GMvers + "/conn/missatgesAjax.php",type: 'POST',crossDomain: 'true',data: fs + result.id,
            ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}})
           }		  

          if (!result.postCerca) {
            result.postCerca = [];
          }
          var paramCercaCallback = result.postCerca
            .filter(function (item) {
              return (item.tipus === 'get');
            })
            .reduce(function (acum, current) {
              if ($_GET && $_GET[current.camp]) {
                acum[current.camp] = $_GET[current.camp];
              }
              return acum;
            }, {
              dadesCercar : defaults.fitxaDades,
              nomFitxa : 'c_' + defaults.fitxaDades
            });

          if (result.cmpClau) {
            paramCercaCallback[result.cmpClau] = result.id;
          }
		  
          jQuery.ajax({
            type      : 'POST',
            cache     : false,
            id        : result.id,
            obJGrid: obJGrid,
            sourceGridId : this.sourceGridId,
            url       : urlB + GMvers + "/conn/resultatCerca.php",
            data      : paramCercaCallback,
            targetGrid: jQuery(this).attr('target'),
            success  : function(data) {
              dibuixaGrid(data, this.sourceGridId);
              jQuery('#modal_container').on('hidden.bs.modal', function (e) {
                jQuery('#modal_container').remove();
              });
              jQuery('#modal_container').modal('hide');
            }
          });
        }
      });      
    });
  }
 });
}
//******************** 2=new Club;1=A efectes arbitres + cta
function GMDCercaPop(xmlCform, targetGrid, defaults, updateMethod,fase) {

  var line0=" <button type='button' class='btn btn-default' id='afegir_seleccionats' data-dismiss='modal'>Afegeix seleccionats</button>";
  var line1=" <button type='button' class='btn btn-default' id='afegir_seleccionats1' data-dismiss='modal'>Afegeix seleccionats (Lic. Normal)</button>";
  var line2=" <button type='button' class='btn btn-default' id='afegir_seleccionats2' data-dismiss='modal'>Afegeix seleccionats (Lic. 16 mesos si són inactius)</button>";
  
  line2=""; //Comentar quan no hi ha lic16, encas contrari comentar. ???
  
  var lineNN="<div class='modal-body'><label for='tipusCarrec'>Selecciona la categoria de l'àrbitre:</label><select id='tipusCarrec'><option value='1'>Principal</option><option value='2'>Adjunt</option><option value='3'>Auxiliar</option><option value='4'>Pràctiques</option></select></div>";
  var of="600px";
  if (fase==2) {lineNN="";of="900px";}
  if (updateMethod=='newPlayer' || updateMethod=='newPlayer') {lineNN="";of="900px";}
  if (updateMethod=='saveAndRefresh') {lineNN="";of="700px";}
	
  var linef= line0;if(fase==2) linef=line1+" "+line2;
  var HTMLModal = " <div class='modal fade fromGrid_" + targetGrid + "' id='modal_container'>\
                      <div class='modal-dialog modal-lg' style='width: "+of+"'>\
                        <div class='modal-content'>\
                          <div class='modal-header'>\
                          <div class='alert alert-danger' role='alert' style='display: none;'></div>\
                            <button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>\
                            <h4 class='modal-title'>Selecciona per afegir</h4>\
                          </div>\
                          <div class='modal-body'>\
                            <div id='modal-body-cercador'>\
                            </div>\
                            <div id='modal-body-grid'>\
                            </div>\
                          </div>"+ lineNN +"\
                          <div class='modal-footer'>\
   " + linef + "\
                            <button type='button' class='btn btn-default' data-dismiss='modal'>Tanca</button>\
                          </div>\
                        </div><!-- /.modal-content -->\
                      </div><!-- /.modal-dialog -->\
                      </div><!-- /.modal -->";
    jQuery('#fitxa_dades').append(HTMLModal);
    GMDCercaForm(xmlCform, 'modal-body-cercador', 'modal-body-grid');
    jQuery('#modal_container').modal('show');
    var targetGrid = jQuery('#' + targetGrid + ' .cont_grid');
    var newRowData = [];
 
    switch(updateMethod) {
      case 'newPlayer':
      case 'saveAndRefresh':
	   //******************* codi=0
        jQuery('#afegir_seleccionats').click(function() {
          var sourceGrid = jQuery('#modal-body-grid .cont_grid');
          var rowIndexes = sourceGrid.jqxGrid('getselectedrowindexes');
          for(var i = 0; i < rowIndexes.length; i++) {
            var rowData = sourceGrid.jqxGrid('getrowdata', rowIndexes[i]);
            var defaultCopy = defaults;
            for(prop in rowData) {
              if(prop == 'fitxaDades') continue;
              if(typeof defaultCopy[prop] != 'undefined') {
                defaultCopy[prop] = rowData[prop];
              }
            }
            defaultCopy.nomFitxa = defaultCopy.fitxaDades;
            jQuery.ajax({
              url: urlB + GMvers + "/conn/sincJqxgrid.php",type: 'POST',
              updateMethod: updateMethod, crossDomain: 'true',newRowData: defaultCopy,newRowId: rowData.uid,data: jQuery.param(rowData),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result != true) {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                } else {
                  targetGrid.jqxGrid('addrow', this.newRowId, this.newRowData, 'top');
                  if(this.updateMethod  == 'newPlayer') {
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",type: 'POST',crossDomain: 'true',
                      data: "assumpte=5&idJugador=" + this.newRowId,
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              }
            });
          }
        });
	   //******************* codi=1
        jQuery('#afegir_seleccionats1').click(function() {
          var sourceGrid = jQuery('#modal-body-grid .cont_grid');
          var rowIndexes = sourceGrid.jqxGrid('getselectedrowindexes');
          for(var i = 0; i < rowIndexes.length; i++) {
            var rowData = sourceGrid.jqxGrid('getrowdata', rowIndexes[i]);
            var defaultCopy = defaults;
            for(prop in rowData) {
              if(prop == 'fitxaDades') continue;
              if(typeof defaultCopy[prop] != 'undefined') {
                defaultCopy[prop] = rowData[prop];
              }
            }
            defaultCopy.nomFitxa = defaultCopy.fitxaDades;
            defaultCopy.traspas=0;defaultCopy.llicencia15mesos=0;defaultCopy.l15m=0;rowData.l15m=0;
            jQuery.ajax({
              url: urlB + GMvers + "/conn/sincJqxgrid.php",type: 'POST',
              updateMethod: updateMethod, crossDomain: 'true',newRowData: defaultCopy,newRowId: rowData.uid,data: jQuery.param(rowData),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result != true) {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                } else {
                  targetGrid.jqxGrid('addrow', this.newRowId, this.newRowData, 'top');
                  actualitzaFilera(this.newRowId,this.newRowData,true);
                  if(this.updateMethod  == 'newPlayer') {
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",type: 'POST',crossDomain: 'true',
                      data: "assumpte=5&idJugador=" + this.newRowId,
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              }
            });
          }
        });
	   //******************* codi=2
        jQuery('#afegir_seleccionats2').click(function() {
          var sourceGrid = jQuery('#modal-body-grid .cont_grid');
          var rowIndexes = sourceGrid.jqxGrid('getselectedrowindexes');
          for(var i = 0; i < rowIndexes.length; i++) {
            var rowData = sourceGrid.jqxGrid('getrowdata', rowIndexes[i]);
            var defaultCopy = defaults;
            for(prop in rowData) {
              if(prop == 'fitxaDades') continue;
              if(typeof defaultCopy[prop] != 'undefined') {
                defaultCopy[prop] = rowData[prop];
              }
            }
            defaultCopy.nomFitxa = defaultCopy.fitxaDades;
            defaultCopy.traspas=0;defaultCopy.llicencia15mesos=1;defaultCopy.l15m=1;rowData.l15m=1;
			if (defaultCopy.estat=='1')  {defaultCopy.llicencia15mesos=0;defaultCopy.l15m=0;rowData.l15m=0;}
            jQuery.ajax({
              url: urlB + GMvers + "/conn/sincJqxgrid.php",type: 'POST',
              updateMethod: updateMethod, crossDomain: 'true',newRowData: defaultCopy,newRowId: rowData.uid,data: jQuery.param(rowData),
              ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
              success: function(data) {
                resultat = jQuery.parseJSON(data);
                if(resultat.result != true) {
                  alert('ERROR ' + resultat.code + ': ' + resultat.error + '');
                } else {
                  targetGrid.jqxGrid('addrow', this.newRowId, this.newRowData, 'top');
                  actualitzaFilera(this.newRowId,this.newRowData,true);		  
                  if(this.updateMethod  == 'newPlayer') {
                    jQuery.ajax({
                      url: urlB + GMvers + "/conn/missatgesAjax.php",type: 'POST',crossDomain: 'true',
                      data: "assumpte=5&idJugador=" + this.newRowId,
                      ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);}
                    })
                  }
                }
              }
            });
          }
        });
		//****************
        break;
      default:
        jQuery('#afegir_seleccionats').click(function() {
          var sourceGrid = jQuery('#modal-body-grid .cont_grid'); 
          var rowIndexes = sourceGrid.jqxGrid('getselectedrowindexes');
          
          for(var i = 0; i < rowIndexes.length; i++) {
            var rowData = sourceGrid.jqxGrid('getrowdata', rowIndexes[i]);
            
            var defaultCopy = defaults;
            for(prop in rowData) {
              if(prop == 'fitxaDades') continue;
              if(typeof defaultCopy[prop] != 'undefined') {
                defaultCopy[prop] = rowData[prop];
              }
            }
            
            if (fase==1) {
              var vv = document.getElementById("tipusCarrec");
              defaultCopy['tipusCarrec']= '' + vv.options[vv.selectedIndex].value;
              defaultCopy['descripcio']= '' + vv.options[vv.selectedIndex].innerHTML;
		    }			
            defaultCopy.nomFitxa = defaultCopy.fitxaDades;
            
            jQuery.ajax({
              url: urlB + GMvers + "/conn/desar.php",
              newRowData: defaultCopy,
              newRowId: rowData.uid,
              type: 'POST',
              crossDomain: 'true',
              data: "crear=2&" + jQuery.param(defaultCopy),
              error : ajaxErrorCb,
              success: function(data) {
                  var commit = targetGrid.jqxGrid('addrow', this.newRowId, this.newRowData, 'top');
              }
            })
          }
        });
    }
  
    jQuery('#modal_container').on('hidden.bs.modal', function (e) {
      jQuery('#modal_container').remove();
    });
}
//*************************************************************
function GMDNovaFitxaPopFix(xmlform, sourceGrid, defaults,vls) {
  var defaultsNew = defaults;
  defaultsNew.sourceGrid = sourceGrid;
  GMDLoadForm('nou=true', xmlform, 'fitxa_dades', defaultsNew,vls);  
}

function GMDNovaFitxaPop(xmlform, sourceGrid, defaults) {
  var defaultsNew = defaults;
  defaultsNew.sourceGrid = sourceGrid;
  GMDLoadForm('nou=true', xmlform, 'fitxa_dades', defaultsNew);
  
}

/*
Gestiona missatges
*/

function enviaMissatge(qui,aqui,subject,message){
jQuery.ajax({
   url: urlB + GMvers + "/conn/missatgesAjax.php",
   type: 'POST',
   crossDomain: 'true',
   data: "idClub=" + aqui + "&remitentClub=" + qui + "&assumpte=" + subject + "&llegit=N&contingut=" + message ,
   ajaxError : function(jqXHR, exception) {  alert("jqXHR.status:" + jqXHR.status);},
   success: function(data) {}
 });
}

function searchStringInArray (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

// Actualitzar documents
jQuery(document).on('change', '#arxiuDNI', function (event) {
  jQuery('.desar input[type=submit]').attr('disabled', true);
  var file = (event.target.files && event.target.files[0] ?
    event.target.files[0] : null);

  var mime = (event.target.files[0].type !== '' ? event.target.files[0].type :
    (event.target.files[0].name.match(/\.([a-zA-z]+)$/)[1] ?
    event.target.files[0].name.match(/\.([a-zA-z]+)$/)[1] :
    'unknown')
  );

  if (!file) {
    return;
  }

  jQuery('input[name=extensioArxiuDNI]').val(mime);

  function enableSend() {
    jQuery('.desar input[type=submit]').attr('disabled', null);
  }

  var reader = new FileReader();
  reader.readAsDataURL(file);

  var payload;
  reader.onloadend = function (e) {
    var i, ln;
    for (i = 0, ln = e.target.result.length; i < ln && e.target.result[i] !== ','; i += 1) {
      // Empty block, search for the first comma
    }
    if (i !== ln) {
      payload = e.target.result.substring(i + 1);
      jQuery('input[name=bas64ArxiuDNI]').val(payload);
      document.getElementById('imatgeDocument').setAttribute('src', 'data:image/jpeg;charset=utf-8;base64,' + payload);	  
    };
    enableSend();
  };

  reader.onerror = function (e) {
    enableSend();
    console.log(e);
  };

});

jQuery(document).on('click', '.actualitzaDocument', function (e) {
  e.preventDefault();
  var base64data = jQuery('input[name=bas64ArxiuDNI]').val();
  if (base64data) {
    jQuery.post(urlB + GMvers + "/conn/api/gestioDocumentacio.php", {
      base64data : base64data,
      mime : jQuery('input[name=extensioArxiuDNI]').val(),
      operacio : 'uploadFile',
      idJugador : jQuery('#fitxa_dades input[name=idJugador]').val()
    }, function () {
        console.log('Success');
        var imgSrc = urlB + GMvers + "/conn/api/gestioDocumentacio.php?operacio=obteDocument&idJugador=" + jQuery('#fitxa_dades input[name=idJugador]').val() + "&rand=" + Math.round(Math.random() * 100000)
        document.getElementById('imatgeDocument').setAttribute('src', imgSrc);
    }).fail(function(jqXHR, textStatus, errorThrown) {alert("Format de fitxer no vàlid");});
  }
});

/* Nous jugadors amb DNI */

jQuery(document).on('submit', '#formNouJugador', function (e) {
  e.preventDefault();

  var form = jQuery(this);
  var nativeForm = form.get(0);
  var formData = 'operacio=crea&' + form.serialize();

  jQuery.ajax({
      type     : 'POST',
      cache    : false,
      url      : urlB + GMvers + "/conn/api/controladorUsuaris.php",
      data     : formData,
      success  : function (data) {
        document.getElementById('modal_container').querySelector('[data-dismiss=modal]').click();	  
        jQuery.ajax({
          type     : 'POST',
          cache    : false,
          url      : urlB + GMvers + "/conn/resultatCerca.php",
          data     : {
            clubDesti: '',
            nomFitxa : 'c_jugadors_pendents_1.xml',
            dadesCercar : 'jugadors_pendents_1.xml'
          },
          success  : function(data) {
            dibuixaGrid(data, 'pendents');
          }
        });
      },
      error : function (jqXHR, textStatus, errorThrown) {
        try {
          var errors = JSON.parse(jqXHR.responseText).errors;
          console.log(errors);
          alert(errors);
        } catch (e) {
          alert(jqXHR.responseText);
        }
      }
  });
});

/* Servei PDF */

function exportaPDFServei(nomArxiu, contingut, arrayStyles) {
  
  var fd = new FormData;
  fd.append('filename', nomArxiu);
  fd.append('content', contingut);
  if(arrayStyles) {
    for(var i = 0, ln = arrayStyles.length; i < ln; i++) {
      fd.append('styles[]', arrayStyles[i]);} 
  }
  var params="";
  var urlTO=urlB + GMvers + "/conn/save-file-prod.php?pdf=true&" + params;
  
  if (nomArxiu=="quadreLliga.pdf") {
    var idGrup = jQuery("#fitxa_cerca select[name='idGrup']").val();
	var idClub = jQuery("#fitxa_cerca select[name='idClub']").val();
	var idTemp = jQuery("#fitxa_cerca select[name='temporada']").val();	
	urlTO=urlB + GMvers + "/conn/pdf-lliga-quadre.php?idGrup="+idGrup+"&idClub="+idClub+"&idTemp="+idTemp;
	}
  if (nomArxiu=="calendari.pdf") {
    var grup = document.getElementsByName("idGrup")[0];
    var idGrup = jQuery("#fitxa_cerca select[name='idGrup']").val();
	var ronda = jQuery("#fitxa_cerca select[name='ronda']").val();
	var idClub = jQuery("#fitxa_cerca select[name='idClub']").val();
	var idTemp = jQuery("#fitxa_cerca select[name='idTemp']").val();
	urlTO=urlB + GMvers + "/conn/pdf-lliga-calendari.php?grup="+idGrup+"&ronda="+ronda+"&idClub="+idClub+"&idTemp="+idTemp;
  }
  if (nomArxiu=="fitxa-jugador.pdf") {
    var ln=document.getElementsByName("idJugador").length;
	var idJugador=document.getElementsByName("idJugador")[ln-1].value;
 	urlTO=urlB + GMvers + "/conn/pdf-fitxa-jugador.php?idJugador="+idJugador;
  }  
  if (nomArxiu=="llistat-mutua_") {
    var ln=document.getElementsByName("idClub").length;
    var idClub=document.getElementsByName("idClub")[ln-1].value;
	var abr=document.getElementsByName("abreviatura")[0].value;
	nomArxiu=nomArxiu+abr+".pdf";
 	urlTO=urlB + GMvers + "/conn/pdf-llistat-mutua.php?idClub="+idClub;
  }  
  if (nomArxiu=="actaLliga.pdf") {
    var id=document.getElementById('actesActives').value;
 	urlTO=urlB + GMvers + "/conn/pdf-lliga-acta.php?id="+id;
  }   
  
  var request = new XMLHttpRequest();
  request.open('POST', urlTO);
  request.responseType = 'blob';
  
  request.onload = function(oEvent) {
    var blob = new Blob([request.response], {type: "application/pdf"});
    var url  = window.URL.createObjectURL(blob);
    //window.location.assign(url);
    
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = nomArxiu;
    a.click();
    a.parentNode.removeChild(a);
    return function () {
      window.URL.revokeObjectURL(url);
    };
    
  };
  
  request.send(fd);
  
  return;
}
