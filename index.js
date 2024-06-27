const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require("./Models/task")

const uri ="mongodb+srv://akuk:halamathihabibo@merncluster.0firaqp.mongodb.net/merndb";
// mongodb+srv://${username}:${password}@cluster0.mongodb.net/${dbname}?retryWrites=true&w=majority

const app =express()
app.use(cors())
app.use(express.json())
mongoose.connect(uri)

app.post('/add',(req,res)=>{
     const { title, description } = req.body;
    TaskModel.create({
        title: title,
        description: description
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TaskModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.get('/tasks', (req, res) => {
    TaskModel.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    TaskModel.findByIdAndUpdate(id, { title, description }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
app.listen(8000,()=>{console.log("server is running")})