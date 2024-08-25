const mongoose = require("mongoose");
const db = {
  url: process.env.DB_URL // Replace with your actual MongoDB URL
};

function connect(){
  mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("MongoDB connected successfully");
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
  });
}


module.exports = connect;
