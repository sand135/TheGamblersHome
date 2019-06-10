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
    let moneyForNewregisteredPlayer = 1000
        db.run('INSERT INTO users VALUES (?,?,?)', [username, password, moneyForNewregisteredPlayer]).then(()=>{
          response.status(200)
          response.send("New user registered")
        }).catch(err =>{
          console.log(err);
          response.status(409)
          response.send("User already excists!")
        })
    .catch(err=>{
      console.log(err);
    })
  })


app.listen(3000, ()=>{
  console.log('Server is running!');
})
