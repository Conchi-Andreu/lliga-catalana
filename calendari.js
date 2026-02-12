(function () {

var prtemp="";

jQuery.fn.modal.Constructor.prototype.enforceFocus = function () {
  var that = this;
  $(document).on('focusin.modal', function (e) {
     if ($(e.target).hasClass('select2-input')) {
        return true;
     }

     if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
        that.$element.focus();
     }
  });
};

var opcioPendents = '';
if($_GET['pendents'] && $_GET['pendents'] == 'true') {
  opcioPendents = '&pendents=true'
} 

var dibuixaCalendari = function(llistaPartides,tempo) {
  var fragment = document.createDocumentFragment();
  
  for(var i = 0, ln = llistaPartides.length; i < ln; i++) {
    var table = document.createElement('table');
    table.className = "classificacio_creuada col-md-12";
    var heading = document.createElement('h5');
    heading.textContent = llistaPartides[i].entradaCalendari;
    //???
	var trow = document.createElement('tr');
	var td = document.createElement('td');
    var a = document.createElement('a');
	var add="";if(tempo!="") add="&temporada="+tempo;	
    a.setAttribute("href", URLWeb + "?op=20&tasca=quadreClassificacio&idGrup="+ llistaPartides[i].idGrup + "&submit=true"+add);
    a.textContent="Veure classificació";
	td.style.textAlign = "left";
	td.className = "col-md-4";
    td.appendChild(a);	
	trow.appendChild(td);
	table.appendChild(trow);
	
	for(var j = 0, ln2 = llistaPartides[i].partides.length; j < ln2; j++) {
      var trow = document.createElement('tr');
      if(j % 2 == 0) trow.className = "parell";
      for(var k = 0; k < 3; k++) {
        var td = document.createElement('td');
        td.style.verticalAlign = "middle";
        if(k % 2 == 1) {
          td.className = "col-md-2";
        } else {
          td.className = "col-md-4";
        }
        if(llistaPartides[i].partides[j][k] != '0 - 0') {
          td.textContent = llistaPartides[i].partides[j][k];
        }
        trow.appendChild(td);
      }
      var td = document.createElement('td');
      td.className = "col-md-2";
      td.style.verticalAlign = "middle";
      var img = document.createElement('img');
      var a = document.createElement('a');
      a.setAttribute("title", "Mostra el resultat de la ronda");
      a.setAttribute("href", URLWeb + "?op=20&tasca=resultats#/grup/" + llistaPartides[i].idGrup +"/acta/" + llistaPartides[i].partides[j][3]);
      img.setAttribute("src", "../../components/com_fce/images/acta.png");
      a.appendChild(img);
      td.appendChild(a);
      trow.appendChild(td);
      table.appendChild(trow);
    }
    fragment.appendChild(heading);
    fragment.appendChild(table);
  }
  
  
  jQuery('#contenidorResultat').empty()
  document.getElementById('contenidorResultat').appendChild(fragment);
  
}

jQuery("#fitxa_cerca").on("click", "#seleccionaCalendari", function(e) {
  e.preventDefault();
  var dataQuery = "task=calendari";var tempo='';
  ['ronda', 'idClub', 'idGrup','idTemp'].forEach(function(idDOM) {
    var value = document.getElementById(idDOM).value;
    if(value != '') {
	  if(idDOM=="idTemp") tempo= value;	
      dataQuery += "&" + idDOM + "=" + value;
      $_GET[idDOM] = value;
    } else {
      if($_GET[idDOM]) delete $_GET[idDOM];
    }
  });
  
  $_GET['submit'] = true;
  $_GET.updateHash();
  
  jQuery.ajax({
    url: urlB + GMvers + "/conn/serveisLliga.php",
    type: 'GET',
    idGrup: idGrup,
    crossDomain: 'true',
    data: dataQuery + opcioPendents,
    error : function(jqXHR, exception, error) {
      resultat = jQuery.parseJSON(jqXHR.responseText);
	  if(jqXHR.status==501 || jqXHR.status==502) jQuery('#EquipRetirat').show();
       else alert("Error " + jqXHR.status + ":\n" + resultat.message);
    },
    success: function(data) { jQuery('#EquipRetirat').hide();
      dibuixaCalendari(JSON.parse(data),tempo);
    }
  });   
});

jQuery("#fitxa_cerca").on("change", "#idTemp", function(e) {LoadGrup();});

LoadGrup();

function LoadGrup() {

  var ztemp=document.getElementById('idTemp').value;
  if($_GET['idTemp'] && $_GET['idTemp'] && prtemp=="") {ztemp=$_GET['idTemp'];prtemp="1";document.getElementById('idTemp').value=ztemp;}

jQuery.ajax({
  url: urlB + GMvers + "/conn/serveisLliga.php",
  type: 'GET',
  temporada: this.value,
  crossDomain: 'true',
  data: "task=grupsActes&idTemp="+ztemp+"&resultats=true",  
  error : function(jqXHR, exception, error) {
    resultat = jQuery.parseJSON(jqXHR.responseText);  
    alert("Error " + jqXHR.status + ":\n" + resultat.message);
  },
  success: function(data) {
    fetchedCategories = [['', 'Totes']].concat(JSON.parse(data));
    var selectInput = document.getElementById('idGrup');
    var fragment = document.createDocumentFragment();
    selectInput.innerHTML='';         
    for(var i = 0, ln = fetchedCategories.length; i < ln; i++) {
      var optionSelect = document.createElement("option");
      if($_GET['idGrup'] && $_GET['idGrup'] == fetchedCategories[i][0]) {
        optionSelect.selected = true;
      }
      optionSelect.value = fetchedCategories[i][0];
      optionSelect.textContent = fetchedCategories[i][1];
      fragment.appendChild(optionSelect);
    }
    selectInput.appendChild(fragment);
    
    jQuery.ajax({
      url: urlB + GMvers + "/conn/serveisLliga.php",
      type: 'GET',
      temporada: this.value,
      crossDomain: 'true',
      data: "task=clubsActius",
      error : function(jqXHR, exception, error) {
        resultat = jQuery.parseJSON(jqXHR.responseText);  
        alert("Error " + jqXHR.status + ":\n" + resultat.message);
      },
      success: function(data) {
        fetchedClubs = [['', 'Tots']].concat(JSON.parse(data));
        var selectInput = document.getElementById('idClub');
        var fragment = document.createDocumentFragment();

        for(var i = 0, ln = fetchedClubs.length ; i < ln; i++) {
          var optionSelect = document.createElement("option")
          if($_GET['idClub'] && $_GET['idClub'] == fetchedClubs[i][0]) {
            optionSelect.selected = true;
          }
          
          optionSelect.value = fetchedClubs[i][0];
          optionSelect.textContent = fetchedClubs[i][1];
          fragment.appendChild(optionSelect);
        }
        selectInput.appendChild(fragment);
        if($_GET['submit'] && $_GET['submit'] == 'true') {
          document.querySelector('#seleccionaCalendari').click();
        }
        //jQuery(selectInput).select2({language : 'en-gb'});
        
      }
    });
    
  }
});

} 
  
if($_GET['ronda']) {
  document.querySelector('#ronda').value = $_GET['ronda'];
}
  
})();
