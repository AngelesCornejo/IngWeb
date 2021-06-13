const express = require('express');
const fileUpload = require('express-fileupload')
const app = express();
app.use(fileUpload())
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({
    path: './env/.env'
});

app.use('/resources', express.static('Public'));
app.use('/resources', express.static(__dirname + '/Public'));

app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 8080);

const bcrypt = require('bcryptjs');

const session = require('express-session');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const connection = require('./database/db');

app.get('/', (req, res) => {
    // res.sendFile(rootPath + '/views/bienvenida.html');
    res.render("bienvenida");
});

app.get('/login', (req, res) => {
    //res.sendFile(rootPath + '/views/login.html');
    res.render("login");
});




app.get('/register', (req, res) => {
    res.render('login');
});

app.get('/receta', (req, res) => {
    res.render('receta');
});

/*app.get('/perfil',(req,res)=>{
  res.render('perfil');
});*/

app.post('/register', async (req, res) => {
    if (req.session.registrado == 1) {
        res.redirect('login');
    } else {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrase = req.body.contrase;
        const pass = req.body.pass;
        let passwordHaash = await bcrypt.hash(contrase, 8);

        if (contrase == pass) {
            connection.query('INSERT INTO usuarios SET ?', {
                nombre: nombre,
                password: passwordHaash,
                email: email
            }, async (error, results) => {
                if (error) {
                    // console.log(error)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario o correo ya existe",
                        alertIcon: 'warning',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    });
                } else {
                    req.session.registrado = 1;
                    res.render('login', {
                        alert: true,
                        alertTitle: "Registro Completo",
                        alertMessage: "Inicia Sesión!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    })
                }
            });
        } else {
            //res.send('Ingresar contraseñas iguales');
            res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Ingrese contraseñas iguales",
                alertIcon: 'warning',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }
    }
});

app.post('/AgregaDes', async (req, res) => {
    const descripcion = req.body.descripcion;
    const name = req.session.name;
    logueado = req.session.logueado;
    /*console.log(name);*/
    if (req.session.des == 1) {
        res.redirect('Perfil');
    } else {
        connection.query('UPDATE usuarios SET descripcion = ? WHERE nombre = ?', [descripcion, name], async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                connection.query('SELECT descripcion FROM usuarios WHERE nombre = ?', [name], async (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        req.session.description = results[0].descripcion;
                        req.session.logueado = 1;
                        logueado = req.session.logueado;
                        res.render('perfil', {
                            logueado: true,
                            name: req.session.name,
                            descripcion: req.session.description
                        })
                    }
                })
            }
        });
    }
})

app.post('/ConfigurarDatos', async (req, res) => {
    const name = req.body.name;
    const correo = req.body.correo;
    const pais = req.body.pais;
    const genero = req.body.genero;
    const ident = req.session.identifier;
    logueado = req.session.logueado;
    /*console.log(name);*/
    if (req.session.des == 1) {
        res.redirect('Perfil');
    } else {

        connection.query('UPDATE usuarios SET nombre = ?, email = ?, pais=?, genero = ? WHERE id_user = ?', [name, correo, pais, genero, ident], async (error, results) => {
            if (error) {
                console.log(error);
            } else {
                connection.query('SELECT nombre,email,pais,genero FROM usuarios WHERE id_user = ?', [ident], async (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        req.session.name = results[0].nombre;
                        req.session.correo = results[0].email;
                        req.session.pais = results[0].pais;
                        req.session.genero = results[0].genero;
                        req.session.logueado = 1; 
                        logueado = req.session.logueado;
                        if (req.session.genero == "Masculino") {
                            chec = "checked";
                            chec1 = "";
                            chec2 = "";
                        } else if (req.session.genero == "Femenino") {
                            chec1 = "checked";
                            chec = "";
                            chec2 = "";
                        } else if (req.session.genero == "Otro") {
                            chec2 = "checked";
                            chec = "";
                            chec1 = "";
                        } else {
                            chec2 = "";
                            chec = "";
                            chec1 = "";
                        }
                        res.render('configuracion', {
                            logueado: true,
                            name: req.session.name,
                            correo: req.session.correo,
                            pais: req.session.pais,
                            chec,
                            chec1,
                            chec2
                        })
                    }
                })
            }
        });

    }
})

app.post('/auth', async (req, res) => {
    const nombre = req.body.nombre;
    const contrase = req.body.contrase;
    let passwordHaash = await bcrypt.hash(contrase, 8);

    if (nombre && contrase) {
        connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], async (error, results) => {
            if (results == undefined || results.length == 0 || !(await bcrypt.compare(contrase, results[0].password))) {
                // res.send('Usuario o password Incorrecto');
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "USUARIO y/o PASSWORD incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                req.session.logueado = 1;
                req.session.name = results[0].nombre;
                req.session.description = results[0].descripcion;
                req.session.correo = results[0].email;
                req.session.identifier = results[0].id_user;
                req.session.pais = results[0].pais;
                req.session.genero = results[0].genero;
                req.session.estrellas = results[0].estrellas_prom;
                req.session.npuntua = results[0].npuntuaciones;
                res.redirect('Blog/1');
                // res.send('Login correcto');
                /*req.session.loggedIn = true;
       req.session.name =results[0].nombre;
       res.render('login',{
        alert: true,
        alertTitle: "Exitoso",
        alertMessage: "LOGIN CORRECTO",
        alertIcon:'success',
        showConfirmButton: false,
        timer: 1500,
        ruta: ''   
     });*/
                // res.render('bienvenida');
            }
        });
    } else {
        //res.send('Ingrese usuario y password');
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese usuario y password",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
        res.end();
    }
});

app.get('/Blog/:id', (req, res) => {
     var id= req.params
    if(id=null){
    id=1
    }
        logueado = req.session.logueado;
            connection.query('SELECT * FROM categorias;select id_receta, nb_imagen_receta,nomb_receta from recetas where id_categoria = '+req.params.id, function(err, rows) {
            if (err) {
                console.log(err)
                console.log("Listillo usando:")
            }
            else{
                res.render('blog', {
                logueado: logueado,
                categoria: rows[0],
                recetas: rows[1],
                seleccionado:req.params
            });
            }; 
        });
});
app.get('/recetas/:id', function(req, res) {
    var id= req.params
    if(id=null){
    id=1
    }
    console.log(req.session.logueado);
    if(req.session.logueado){
        logueado = req.session.logueado;
            connection.query('SELECT * FROM categorias;select * from recetas where id_receta = '+req.params.id+";select * from recetas_ing natural join ingredientes where id_receta="+req.params.id, function(err, rows) {
            if (err) {
                console.log(err)
                console.log("Listillo usando:")
            }
            else{
                res.render('vReceta', {
                logueado: logueado,
                categoria: rows[0],
                receta:rows[1],
                ingredientes:rows[2]
            });
            }; 
        });
    }else{
    res.redirect("/login");
    }
});

app.get('/agregaRec', (req, res) => {
    logueado = req.session.logueado;

    if (logueado) {
     connection.query('SELECT * FROM categorias;select * from req_especiales; select * from ingredientes',[0,1,2], function(err, rows) {
        if (err) {
            console.log(err)
            console.log("Listillo usando:")
        }
        else{
         res.render('agregar', {
            logueado: true,
            categoria: rows[0],
            reqsp: rows[1],
            ingdts: rows[2]
        });
        };
        
    });
    } else {
        res.redirect("/login");
    }
});

app.post('/saveRec', (req, res) => {
    logueado = req.session.logueado;

    if (logueado) {
        let EDFile = req.files.img
        //console.log(EDFile)
        EDFile.mv(`./Public/img_rec/${EDFile.md5}`,err => {
    
            if(err) return res.status(500).send({ message : err })
    
            connection.query('INSERT INTO recetas SET ?', {
                nb_imagen_receta: EDFile.md5,
                nomb_receta: req.body.nom_rec,
                descripcion: req.body.des,
                tiempo:req.body.tiempo_rec,
                nacionalidad:req.body.nac_rec,
                calorias:req.body.cal_rec,
                porcion_calorias:req.body.porc_rec,
                tipo_porcion:req.body.t_por,
                id_categoria:req.body.tip,
                procedimiento: req.body.pas
            }, async (error, results) => {
                if (error)console.log(error);
                //console.log(error)
                var inse="insert into recetas_ing values("
                var i=req.body.num-1;
                for (i = 1; i <= req.body.num; i++) {
                    inse+=results.insertId+","+req.body['ing'+i]+","+req.body['ct'+i]+","+req.body['med'+i]+"),("
                } 
                inse=inse.substring(0,inse.length-2)

                connection.query(inse,async (error, results) => {
                    
                    if (error){
                        console.log(error)
                        res.render('error',{
                            alert: true,
                            alertTitle: "Error",
                            alertMessage: "Ocurrio un error en este momento, intente de nuevo",
                            alertIcon: 'warning',
                            showConfirmButton: true,
                            timer: false,
                            ruta: '/Blog/1'
                        });
                    }else{
                        res.render('error',{
                            alert: true,
                            alertTitle: "Publicado",
                            alertMessage: "Publicado con éxito",
                            alertIcon: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                            ruta: '/Blog/1'
                        });
                    }
            })
        })
    
    });

    } else {
        res.redirect("/login");
    }
});

app.get('/Salir', (req, res) => {
    logueado = req.session.logueado;
    if (logueado) {
        req.session.destroy();
        res.redirect("/Blog/1");
    } else {
        res.redirect("/login");
    }
    res.end();
});



app.get('/Perfil', (req, res) => {
    logueado = req.session.logueado;
    if (logueado) {
        req.session.des = 0;
        desAct = req.session.des;
        res.render('perfil', {
            logueado: true,
            name: req.session.name,
            descripcion: req.session.description,
            estrellas : req.session.estrellas,
            npuntua : req.session.npuntua

        });
    } else {
        res.redirect("/login");
    }
});


app.get('/Configuracion', (req, res) => {
    //res.sendFile(rootPath + '/views/login.html');
    logueado = req.session.logueado;
    if (logueado) {
        if (req.session.genero == "Masculino") {
            chec = "checked";
            chec1 = "";
            chec2 = "";
        } else if (req.session.genero == "Femenino") {
            chec1 = "checked";
            chec = "";
            chec2 = "";
        } else if (req.session.genero == "Otro") {
            chec2 = "checker";
            chec = "";
            chec1 = "";
        } else {
            chec2 = "";
            chec = "";
            chec1 = "";
        }
        res.render('configuracion', {
            logueado: true,
            name: req.session.name,
            correo: req.session.correo,
            pais: req.session.pais,
            chec,
            chec1,
            chec2
        });
    } else {
        res.redirect("/login");
    }
});

app.post('/CambContrase',async (req,res)=>{
  const contrase1=req.body.cont1;
  const contrase2=req.body.cont2;
  const contrase3=req.body.cont3;
  let passwordHaash = await bcrypt.hash(contrase1,8);
  let passHaash = await bcrypt.hash(contrase2,8);
  identifier = req.session.identifier;
  if(contrase1 && contrase2 && contrase3){
    connection.query('SELECT password FROM usuarios WHERE id_user=?',[identifier],async(error,results)=>{
      if(results.length == 0 || !(await bcrypt.compare(contrase1,results[0].password))){
        console.log(error);
        
        res.redirect('/Perfil');
      } else{
        if(contrase2 == contrase3){
          connection.query('UPDATE usuarios SET password = ? WHERE id_user =?',[passHaash,identifier],async(error,results)=>{
           if(error){
             console.log(error);
           }else{
            console.log("Cambio de contraseñas listo!");
            req.session.destroy();
            res.redirect('/login');
           }
          })
        }else {
          console.log("Las contraseñas no coinciden");
          res.redirect('/Perfil');
        }
      }
    })
  } else {
    console.log("Llenar todos los campos");
    res.redirect('/Perfil');
  }
})

// Define authentication middleware BEFORE your routes
var authenticate = function(req, res, next) {
    var isAuthenticated = true;
    if (isAuthenticated) {
        next();
    } else {
        // redirect user to authentication page or throw error or whatever
    }
}




app.listen(app.get('port'), () => {
    console.log("Server running on :" + app.get('port'))
});
