const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const router = require('./router/api');
const app = express();
const port = 8000;


const url = 'mongodb+srv://ridoy:ridoy123@webdevs.49hgn.mongodb.net/crud_project';
const dbName = "crud_project";

let db = null;


// Connect to MongoDB
const connectToDB = async () => {
    const client = new MongoClient(url)
    await client.connect()
    db = client.db(dbName)
    console.log('Connected to MongoDB')
    return db;
}


app.use(bodyParser.json())

connectToDB().then((database) => {
    app.use((req, res, next) => {
        req.db = database;
        next()
    })

    // routes

    app.use("/api", router)


}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);

})


app.listen(port, () => {
    console.log("Server is listening on port:", port);

});