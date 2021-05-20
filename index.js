const express = require('express');

const app = express();
const path = require('path');

//let rootPath = path.normalize(__dirname + '/Public');

app.set('view engine','ejs');

app.set('port',process.env.PORT || 5000);

app.use(express.urlencoded({extended: false}));

app.use('/resources',express.static('Public'));
app.use('/resources',express.static(__dirname +'/Public'));

console.log(__dirname);


app.get('/', (req,res)=>{
  // res.sendFile(rootPath + '/views/bienvenida.html');
  res.render("bienvenida");
 });

 app.get('/login', (req,res)=>{
  //res.sendFile(rootPath + '/views/login.html');
  res.render("login");
});


 app.listen(app.get('port'),()=>{
     console.log("Server running on :"+app.get('port'))
    });
