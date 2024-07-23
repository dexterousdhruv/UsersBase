const { default: mongoose } = require("mongoose");


const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI )
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log(`Error: ${err}`))
}

module.exports = connectDB  