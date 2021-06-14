/*var nombre=document.getElementById(nom).value;
var email = document.getElementById(corr).value;
const letras = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

if (letras.indexOf(nombre) == -1){
    alert("Please enter unicamente letras");
    console.log("Invalid");
}*/
function soloLetras(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [8, 37, 39, 46],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }

  function validarEmail(elemento){

    var texto = document.getElementById(elemento.id).value;
    var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if (!regex.test(texto)) {
        document.getElementById("resultado").innerHTML = "Correo invalido, recuerde incluir un @ y .";
        document.getElementById("resultado").style.display="block";
        document.getElementById("resultado").style.border="0.2px solid gray";
        document.getElementById("resultado").style.padding="3px";
        document.getElementById("resultado").style.width="30%";
        document.getElementById("resultado").style.textAlign="center";
        document.getElementById("resultado").style.backgroundColor="#e5ffff"
        document.getElementById("resultado").style.borderRadius="5px";

    } else {
      document.getElementById("resultado").innerHTML = "";
      document.getElementById("resultado").style.display="none";
      document.getElementById("resultado").style.border="none";
    }
  
  }