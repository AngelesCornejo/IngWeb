
document.getElementById("btn_registrarse").addEventListener("click",register);
document.getElementById("btn_iniciar_sesion").addEventListener("click",iniciarSesion);
document.getElementById("btn_entrar").addEventListener("click",redireccionar);
window.addEventListener("resize",anchopagina);

var contenedor_login_register = document.querySelector(".contenedor__login_register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var cajaTraseraLogin= document.querySelector(".caja_trasera_login");
var cajaTraseraRegister= document.querySelector(".caja_trasera_register");

function redireccionar(){
    window.location.href="html/otro.html";
}
function anchopagina(){
    if(window.innerWidth>850){
        cajaTraseraLogin.style.display="block";
        cajaTraseraRegister.style.display="block";
    } else {
        cajaTraseraRegister.style.display="block";
        cajaTraseraRegister.style.opacity="1";
        cajaTraseraLogin.style.display="none";
        formulario_login.style.display="block";
        formulario_register.style.display="none";
        contenedor_login_register.style.left="0px";

    }
}

anchopagina();

function iniciarSesion(){
    if(window.innerWidth >850){
        formulario_register.style.display="none";
        contenedor_login_register.style.left="10px";
        formulario_login.style.display="block";
        cajaTraseraRegister.style.opacity="1";
        cajaTraseraLogin.style.opacity="0";
    } else {
        formulario_register.style.display="none";
        contenedor_login_register.style.left="0px";
        formulario_login.style.display="block";
        cajaTraseraRegister.style.display="block";
        cajaTraseraLogin.style.display="none";
    }
}

function register(){
    if(window.innerWidth >850){
    formulario_register.style.display="block";
    contenedor_login_register.style.left="410px";
    formulario_login.style.display="none";
    cajaTraseraRegister.style.opacity="0";
    cajaTraseraLogin.style.opacity="1";
    } else{
        formulario_register.style.display="block";
        contenedor_login_register.style.left="0px";
        formulario_login.style.display="none";
        cajaTraseraRegister.style.display="none";
        cajaTraseraLogin.style.display="block";
        cajaTraseraLogin.style.opacity="1";
    }
}