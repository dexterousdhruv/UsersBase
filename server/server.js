require("dotenv").config();
const express = require("express")
const cors = require("cors");
const connectDB = require("./db/connect");
const userRouter = require("./routes/userRoute");
const PORT = process.env.PORT || '3000'
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('./uploads'))
app.use('/files', express.static('./public/files'))

app.use(userRouter)
   
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`)
})  
    
 