const express = require('express')
const app = express()
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

let db
sqlite.open('users.sqlite').then(database => {
  db = database
})

app.get('/', (request, response) => {
  db.all('SELECT * FROM users').then(rows => {
    response.send(rows)
  })
})

app.get('/users/:username/', (request, response) => {
  var isFound = false
  var user =''
  db.all('SELECT * FROM users').then(users => {
    for (var index in users) {
      if (users[index].username === request.params.username) {
        isFound = true
        user = users[index]
      }
    }
    if (isFound) {
      console.log("Login Successfull");
      console.log('Match')
      console.log(user.username)
      response.status(200)
      response.send(user)
    } else {
      console.log("Fetching user failed");
      response.status(400)
      response.send('Wrong username');
    }
  })
})


app.get('/users/:username/:password', (request, response) => {
  var isFound = false
  db.all('SELECT * FROM users').then(users => {
    for (var user of users) {
      if (user.username === request.params.username && user.password === request.params.password) {
        isFound = true
      }
    }

    if (isFound) {
      console.log("Login Successfull");
      response.status(200)
      response.send(users)

    } else {
      console.log("login failed");
      response.status(400)
      response.send('Incorrect Username and/or Password!');

    }
  })
})

app.post('/', (request, response) => {
  console.log(request.body);
  let username = request.body.username
  let password = request.body.password
  let moneyForNewregisteredPlayer = 1000
  db.run('INSERT INTO users VALUES (?,?,?)', [username, password, moneyForNewregisteredPlayer]).then(() => {
      response.status(200)
      response.send("New user registered")
    }).catch(err => {
      console.log(err);
      response.status(409)
      response.send("User already excists!")
    })
    .catch(err => {
      console.log(err)
    })
})

app.put('/users/:username/', (request, response) => {
  console.log(request.params.username)
  let money = request.body.money
  db.run('UPDATE users SET money=? WHERE username=?', [money, request.params.username])
  response.send("Uppdaterat money på spelarobjektet")
})

app.listen(3000, () => {
  console.log('Server is running!');
})
