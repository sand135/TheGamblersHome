const express = require('express')
const app = express()
var session = require('express-session');
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
app.use(bodyParser.json())


let db
sqlite.open('users.sqlite').then(database =>{
  db = database
})

app.get('/users', (request, response) =>{
  db.all('SELECT * FROM users').then(rows=>{
      response.send(rows)
    })
})


app.get('/users/:username/:password', (request, response) =>{
	var username = request.params.username
	var password = request.params.password
  var isFound = false
  db.all('SELECT * FROM users').then(users=>{
    console.log(users);
    for(var user of users){
      // console.log(user);
      // console.log(user.username, request.params.username, user.password, request.params.password);
  if (user.username === request.params.username && user.password === request.params.password) {
    isFound = true

    }
  }

  if(isFound) {

    console.log("Login Successfull");
    response.status(200)
    response.send(users)

  }else{
      console.log("login failed");
      response.status(400)
      response.send('Incorrect Username and/or Password!');

    }
    })
  })

app.post('/', (request, response) =>{
  console.log(request.body);
  let username = request.body.username
  let password = request.body.password
  let regOk = true
  db.all('SELECT * FROM users').then(users=>{
    for (var user in users) {
      if (user.username === username) {
        regOk = false
      }
    }
    if(regOk){
      db.run('INSERT INTO users VALUES (?,?)', [username, password]).then(()=>{
        console.log("registration ok");
        response.status(200)
        response.send(users)
      })
    }else{
      console.log('registration failed!');
      response.status(400)
      response.send("Bad request")
    }
  })
})


app.listen(3000, ()=>{
  console.log('Server is running!');
})
