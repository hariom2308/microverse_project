const express = require('express')
const app = express()



app.get('/', (req, res) => res.send('Hello from Poland & India!'))


app.listen(3000, () => console.log('Example app listening on port 3000!'))



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
  1: event1 ,
  2: event2 ,
  3: event3 ,
};

app.get('/events', (req, res) => res.send(events));
app.get('/events/:id', (req, res) => res.send(events[req.params.id]));

app.post('/', function (req, res) {
  res.send('Got a POST request');
});
