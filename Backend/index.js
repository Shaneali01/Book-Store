const express = require('express')
const app = express()
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bookroute=require('./Routes/book')
const signuprouter=require('./Routes/User')
const cors=require('cors')
dotenv.config()
const port = process.env.PORT
app.use(cors());
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Specify the origin of your frontend
  credentials: true,                 // Allow credentials (cookies, authorization headers, etc.)
}));
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("SUECCESSFULLY CONNECTED")
})
.catch((error)=>{
    console.log("FAILED TO CONNECT WITH MONGODB",error)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/ping', (req, res) => {
  res.status("WORKING");
});
app.use('/book',bookroute)
app.use('/',signuprouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})