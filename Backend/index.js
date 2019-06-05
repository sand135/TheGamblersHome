const express  =require('express')
const app = express()
const sqlite = require('sqlite')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

let db
sqlite.open('users.sqlite').then(database =>{
  db = database
})

app.get('/', (request, response) =>{
  db.all('SELECT * FROM users').then(rows=>{
      response.send(rows)
    })
})

app.post('/', (request, response) =>{
  console.log(request.body);
  let username = request.body.username
  let password = request.body.password
      db.run('INSERT INTO users VALUES (?,?)', [username, password]).then(()=>{
        response.status(200)
        response.send("New user registered")
      }).catch(err =>{
        console.log(err);
        console.log('registration failed!');
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
