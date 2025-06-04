const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    eventId: {type:mongoose.Schema.Types.ObjectId, ref:'Event',required: true}
},{timestamps: true});

module.exports = mongoose.model('Attendee',attendeeSchema);