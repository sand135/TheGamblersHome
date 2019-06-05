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
