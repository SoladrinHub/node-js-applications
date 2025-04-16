


const express = require ('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://127.0.0.1:27017/myfirstdb')
.then(() => console.log('Mongod connected'))
.catch(err => console.log(' Mongo error:', err));

const User = mongoose.model('User', {
    name: String,
    age: Number,
    email: String

});

app.get('/' , (req, res) => {
    res.send('Hello! this is our basic express + Mongodb app.');
});

app.post('/user', async (req, res) => {
    const newUser = new User({ 
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
     });

    await newUser.save();
    res.send(`User "${newUser.name}" saved!`);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('users', {users});
});

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})
