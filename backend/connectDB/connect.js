const monngose = require('mongoose');

const connectDB = (URI) => {
    return monngose.connect(URI).then(() => {
        console.log("Database is connected to successfully.");
    }).catch((err) => {
        console.log("Somethig went worng!, connectDB function.");
    });
}

module.exports = connectDB;