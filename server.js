const express = require('express');
const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.get('/events/:id', function(req, res) {
  if (!events.hasOwnProperty(req.params.id)) {
    res.status(404).send('error 404');
    } else {
      res.send(events[req.params.id]);
    }
  }
);

app.post('/events', function(req, res) {
    let id = (Object.keys(events).length + 1).toString();
    let title = req.body.title;
    let description = req.body.description;
    let date = req.body.date;
    let newEvent = {"id": id, "title": title, "description": description, "date": date};
    events[id] = newEvent;
});


app.patch('/events/:id', function(req, res) {
  if (!events.hasOwnProperty(req.params.id)) {
    res.status(404).send('Not a valid event id');
    } else {
      id = req.params.id;
      title = req.body.title;
      description = req.body.description;
      date = req.body.date;
      events[id] = req.body ;
      res.send(events[req.params.id]);
    }
  }
);

app.delete('/events/:id', function(req,res) {
  if (!events.hasOwnProperty(req.params.id)) {
    res.status(404).send('Not a valid event id');
    } else {
      delete events[req.params.id];
      res.send('deleted');
    }
  });
