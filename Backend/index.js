const express = require('express')
const app = express()
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let deck =[]

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

app.get('/cards/drawflop', (request, response)=>{
  // Tar bort översta kortet innan man delar ut flop
  this.deck.splice(0, 1)
  var flop = []
    for (var i = 0; i < 3; i++) {
        this.deck[i].id = 'tablecard' + i
        flop.push(this.deck[i])
    }
  this.deck.splice(0, 3)
    response.send(flop)
    })

app.get('/cards/playerCards', (request, response)=>{
  var cardsForTwoPlayers = []
  for (var i = 0; i < 4; i++) {
    cardsForTwoPlayers.push(this.deck[0])
    this.deck.splice(0, 1)
  }
  response.send(cardsForTwoPlayers)
})


app.get('/cards', (request, response) => {
  db.all('SELECT * FROM cards').then(cards => {
    //Gör en array som håller deck här och svarar med kort som finns kvar när frontend vill ha det.
    this.deck = []
    this.deck = cards
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
    }
    response.send('nytt deck har skapats!')
  })
})

//För att sätta till kort i databasen
app.post('/cards', (request, response) => {
  //console.log(request.body);
  let value = request.body.value
  let suit = request.body.suit
  let imageUrl = request.body.imageUrl
  let id = request.body.id
  db.run('INSERT INTO cards VALUES (?,?,?,?)', [value, suit,imageUrl, id]).then(() => {
      response.status(200)
      response.send("card inserted!")
    }).catch(err => {
      console.log(err);
      response.status(409)
      response.send("Fail")
    })
    .catch(err => {
      console.log(err)
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
