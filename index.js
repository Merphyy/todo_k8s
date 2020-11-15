const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Task = require('./task');
const Redis = require('redis');
const { json } = require('body-parser');
const bluebird = require('bluebird');
const task = require('./task');
bluebird.promisifyAll(Redis.RedisClient.prototype);

const client = Redis.createClient();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://merphy123:merphy123@devconnector.r4mnr.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};
connectDB();
//cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res, next) => {
  res.send('Hello');
});

const delAll = () => {
  // client.flushall('ASYNC', (err, suc) => {
  //   console.log(suc);
  // })
  console.log('====hello=====');
};

let count = 0;
//add the task
app.post('/todo', async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      task: req.body.task,
      completed: req.body.completed,
    });
    // console.log(newTask);
    //set the data to the redis
    // client.hset('myhash', count.toString(), JSON.stringify(newTask));
    // count++;

    //set a timer

    //get all data from the redis
    const dataAll = client.hgetallAsync('myhash').then(function (response) {
      let coinListArray = [];
      Object.keys(response).forEach(function (coinKey) {
        if (response[coinKey]) {
          try {
            coinListArray.push(JSON.parse(response[coinKey]));
          } catch (e) {
            console.log(e);
          }
        }
      });
      return coinListArray;
    });
    Promise.resolve(dataAll).then(val => {
      val.forEach(async el => {
        try {
          const newTask = new Task(el);
          const task = await newTask.save();
          console.log('sucess!!!!');
        } catch (error) {
          console.log(error);
        }
      });
    });
    //delete all data in the redis
    setTimeout(delAll, 3000);

    res.send('Succeed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//delete the task
app.delete('/todo/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'task not found' });
    await task.remove();
    res.json({ msg: 'task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    req.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Connected');
});
