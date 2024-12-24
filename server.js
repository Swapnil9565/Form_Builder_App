const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const userRoute=require("./Routes/user")
const groupRoute=require("./Routes/groups")

const dotenv=require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use("/api/user",userRoute);
app.use("/api/groups",groupRoute);

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
 app.listen(port, async () => {
 const conn=await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`);
  
  console.log(`Server is running on port ${port}`);
});