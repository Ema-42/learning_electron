const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/taskdb')
    .then(db => console.log('db si conected loco'))
    .catch(err=>console.log(err))
