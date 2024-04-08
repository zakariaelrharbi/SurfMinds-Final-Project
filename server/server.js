// Initialize the server and start it in this file.
const express = require('express');
const ConnectDB = require('./config/database');
const dotenv = require('dotenv');
const CategoryRouter = require("./routes/CategoryRoutes")
dotenv.config();

const app = express();
app.use(express.json());
app.use(CategoryRouter);

app.get("/", (req, res)=>{
    res.send("Server is running...");
})

ConnectDB();

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log (`Server is running on port ${PORT}`));
