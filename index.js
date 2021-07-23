require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const app=express();
var cors=require('cors');

const port=process.env.PORT||1000;

const newUser=require('./routes/auth')
const newEntry=require('./routes/blog');

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("Database Connected")
})

app.use(express.json())
app.use(cors())
app.use("/api",newUser);
app.use("/api",newEntry);

app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})