const { MongoClient } = require("mongodb");
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require("dotenv").config();
const userRoute = require("./routes/userController");
const connectDB = require("./db/connect");

// Middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())


//Body Parser
app.use(express.urlencoded({extended : false}));

// CheckPath
app.get('/',(req,res)=>{
    res.send('Server is Working')
    //Use this to check to make sure the server is working by going to http://localhost/5000
    //If you see App is working that means the backend server is working
})

//Routes
app.use("/users", userRoute);

const initServer = async() => {
    try {
        await connectDB(process.env.MONGO_URI); // Edit to the env variable string since it wont work like this
        app.listen(port, () => {
            console.log("Listening on port 5000");
        })
    } catch(err) {
        console.log(err);
    }
}
initServer();

