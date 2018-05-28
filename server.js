const express = require('express')
const app = express()

<<<<<<< HEAD
app.get('/', (req, res) => res.send('Hello Worldsss!'))
=======
app.get('/', (req, res) => res.send('Hello from Poland & India!'))
>>>>>>> 29a340b61e535aa86a844dbca12b193cde47a1d2

app.listen(3000, () => console.log('Example app listening on port 3000!'))


<<<<<<< HEAD
let event1 = {
  id: "1" ,
  title: "Homie" ,
  description: "Its happening on Saturday",
  date: "23.06.2018"
};

let event2 = {
  id: "2" ,
  title: "Baba" ,
  description: "Black sheep",
  date: "24.06.2018"
};

let event3 = {
  id: "3" ,
  title: "Ewaa" ,
  description: "Trip to Poland on Friday",
  date: "02.06.2018"
};

let events = {
  1: "event1" ,
  2: "event2" ,
  3: "event3"
};

app.get('/events', (req, res) => res.send(events));
app.get('/events/:1', (req, res) => res.send(events[1]));
=======
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
>>>>>>> 29a340b61e535aa86a844dbca12b193cde47a1d2
