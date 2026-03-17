const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const app = express();
const cors = require("cors");


app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://code-review-xawa.onrender.com'
  ],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));


app.use('/ai',aiRoutes);

app.get('/',(req,res)=>{
    res.send("hello world")
})

module.exports = app;
