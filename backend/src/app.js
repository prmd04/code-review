const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const app = express();
const cors = require("cors");


app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods:["POST"],
    credentials:true,
}));


app.use('/ai',aiRoutes);

app.get('/',(req,res)=>{
    res.send("hello world")
})

module.exports = app;
