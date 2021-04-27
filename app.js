require("dotenv").config();
const express = require('express');
const app = express();
const sequelize = require("./db");
const journal = require('./controllers/journalcontroller');
const user = require('./controllers/usercontroller');


sequelize.sync();
app.use(express.json());

app.use('/test', function(req,res){
    res.send('this is our endpoint')
})

app.use('/user', user);
app.use('/journal', journal)


app.listen(8001, function(){
    console.log('App is listening on port 8001');
})
