const express = require('express');
const app = express();
const path = require('path');

let rootPath = path.normalize(__dirname + '/Public');

app.set('port',process.env.PORT || 5000);

app.use(express.static('./Public'));


app.get('/', (req,res)=>{
    //res.send("Hello world");
   res.sendFile(rootPath + '/views/login.html');
 });

 app.listen(app.get('port'),()=>{
     console.log("Server running on :"+app.get('port'))
    });
