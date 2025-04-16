const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const methodOverride = require('method-override');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/', postRoutes);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server running on port ${PORT}'));
})

.catch(err => console.log(err));