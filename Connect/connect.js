const mongoose = require('mongoose');
const password = "hardeep%40317"

async function connect(){
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb+srv://hardeep41016:${password}@cluster0.icm6dbx.mongodb.net/pay-pal?retryWrites=true&w=majority`,{useNewUrlParser: true,
            // useFindAndModify: false,
            useUnifiedTopology: true
          },(err) => {
            if(err){
                return reject(err);
            }
        })
        resolve(() => {
            console.log("DB connected successfully")
        });
    })
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = connect;