const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('./Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const env = require('dotenv')

require('./passport')


const user = require('./router/userrouter')
const todoRoute = require('./router/todorouter')
const todoComment = require('./router/commentrouter')
const todoActive = require('./router/activerouter')
const todoTag = require('./router/tagrouter')
const todoDownload = require('./router/downloadrouter')
const todoView = require('./router/viewrouter')
const todoLike = require('./router/likerouter')
const todoRate = require('./router/raterouter')

const app = express()
env.config();

app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});


app.use('/user',user)
app.use('/todo', todoRoute)
app.use('/comment', todoComment)
app.use('/activeuser', todoActive)
app.use('/tag',todoTag)
app.use('/download',todoDownload)
app.use('/view',todoView)
app.use('/like',todoLike)
app.use('/rating',todoRate)

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function () {
  console.log('Connected to Mongo');
}).on('error', function (err) {
  console.log('Mongo Error', err);
})
app.listen(5000, () => {
  console.log('Server is up and running at the port 5000')
})
