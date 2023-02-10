const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/Users')
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://maitri14:maitri@cluster0.anxyfzf.mongodb.net/comp3133_lab4?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

//http://localhost:3000/users
app.post('/users', async (req, res) => {
    const user = new userModel(req.body);
    try {
      await user.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(user);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.listen(3000, () => { console.log('Server is running...') });
