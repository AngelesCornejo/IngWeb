var nid = 1;
function addInput(){
	nid = nid + 1;
var $elem=$('#ing').clone(true).html();
var $elem1=$('#med').clone(true).html();
	console.log($elem)
	var newImp0= document.createElement("div");
  var newImp= document.createElement("div");
  var newImp2= document.createElement("div");
  var newImp3= document.createElement("div");
	var newImp4= document.createElement("div");

  newImp.id= "divcampo_"+(nid);
  newImp2.id= "divcampo2_"+(nid);
  newImp3.id= "divcampo3_"+(nid);
  newImp0.id= "divcampo4_"+(nid);
	newImp4.id= "divcampo5_"+(nid);

  newImp0.innerHTML="<div class='"+nid+"col-lg-12 col-md-12 col-sm-12 col-xs-12' id='d"+nid+"'>"+"<br>";

  newImp.innerHTML=
"<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4' id='i"+nid+"'>"+"<select class='select-search' id='ing"+nid+"' name='ing"+nid+"'>"+
 $elem+"</select>"+"</div>";

 newImp2.innerHTML=
 "<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4' id='c"+nid+"'>"+"<input type='text' class='form-control' placeholder='250' id='ct"+nid+"' name='ct"+nid+"' required>"+"</div>";

 newImp3.innerHTML=
 "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2' id='m"+nid+"'>"+
 "<select class='select-search' id='med"+nid+"' name='med"+nid+"'>"+
  $elem1+"</select>"+"</div>";

	newImp4.innerHTML="<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'>"+"<center>"+"<button type='button' id='"+nid+"' class='"+nid+" btn btn-warning' onClick='remInp(this.id)'>"+"X"+"</button>"+"</center>"+"</div>"+"</div>";

  var contenedor= document.getElementById("dinImp");
  contenedor.appendChild(newImp0);
  contenedor.appendChild(newImp);
  contenedor.appendChild(newImp2);
  contenedor.appendChild(newImp3);
	contenedor.appendChild(newImp4);

	document.getElementById("num").value = nid;

}

function remInp(c_id){
	var a = c_id;
	$("."+a).remove();
	$("#i"+a).remove();
	$("#c"+a).remove();
	$("#m"+a).remove();
	$("#d"+a).remove();
	nid = nid - 1;
}
