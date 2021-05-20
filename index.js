const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

app.use('/resources',express.static('Public'));
app.use('/resources',express.static(__dirname +'/Public'));

app.set('view engine','ejs');

app.set('port',process.env.PORT || 5000);

const bcrypt = require('bcryptjs');

const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

const connection = require('./database/db');

app.get('/', (req,res)=>{
  // res.sendFile(rootPath + '/views/bienvenida.html');
  res.render("bienvenida");
 });

 app.get('/login', (req,res)=>{
  //res.sendFile(rootPath + '/views/login.html');
  res.render("login");
});

app.get('/register',(req,res)=>{
  res.render('login');
});

app.post('/register',async(req,res)=>{
    const nombre = req.body.nombre;
    const email = req.body.email;
    const contrase = req.body.contrase;
    let passwordHaash = await bcrypt.hash(contrase,8);
    connection.query('INSERT INTO usuarios SET ?',{nombre:nombre,password:passwordHaash,email:email},async(error,results)=>{
      if(error){
        console.log(error)
      } else {
        res.render('login',{
          alert:true,
          alertTitle:"Registration",
          alertMessage:"Successfully!",
          alertIcon:'success',
          showConfirmButton:false,
          timer:1500,
          ruta:''
        })
      }
    });
});

app.post('/auth',async(req,res)=>{
  const nombre = req.body.nombre;
  const contrase = req.body.contrase;
  let passwordHaash = await bcrypt.hash(contrase,8);
  
  if(nombre && contrase){
    connection.query('SELECT * FROM usuarios WHERE nombre = ?',[nombre],async(error,results)=>{
      if(results.length == 0 || !(await bcrypt.compare(contrase,results[0].password))){
        req.session.logueado=0;
        res.send('Usuario o password Incorrecto');
      }else{
        req.session.logueado=1;
        res.redirect("/Blog");
        res.send('Login correcto');
        
      }
    });
  }
});

app.get('/Blog',(req,res)=>{
  logueado=req.session.logueado;
  if(logueado){
  res.render('blog',{logueado});
  }else{
    res.redirect("/login");
  }
});


// Define authentication middleware BEFORE your routes
var authenticate = function (req, res, next) {
  var isAuthenticated = true;
  if (isAuthenticated) {
    next();
  }
  else {
    // redirect user to authentication page or throw error or whatever
  }
}




app.listen(app.get('port'),()=>{
     console.log("Server running on :"+app.get('port'))
    });
