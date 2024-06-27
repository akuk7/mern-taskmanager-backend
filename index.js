const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require("./Models/task")

const uri = process.env.MONGODB_URI;
const app =express()
app.use(cors())
app.use(express.json())
mongoose.connect(uri)

app.get('/', (req, res) => {
    res.send('Hello World');
});

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
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});