const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedule=new Schema({

    meetingId:{type:String},
    date:{type:Date},
    startTime:{type:String},
    endTime:{type:String},
    Status:{type:String,default:"ACTIVE"}
})
module.exports = mongoose.model('meeting', schedule)