const mongoose=require('mongoose')
const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
})
const TaskModel = mongoose.model('task',taskSchema)
module.exports= TaskModel 