const {model,Schema} = require('mongoose');

const newTaskScheema =  new Schema({
    name:{
        type :String,
        required : true,
    }
    ,
    description:{
        type:String,
        required:true
    },
    created_at:{
        type:String,
        required:false
    }
})

module.exports =model('Task',newTaskScheema)
