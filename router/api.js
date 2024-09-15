const express = require('express');
const { ObjectId } = require("mongodb")
const router = express.Router();



//create

router.post("/Create", async (req, res) => {
    const db = req.db
    const reqBody = req.body

    try {
        const data = await db.collection("students").insertOne(reqBody)
        res.json({status: "success", data: data.json})
    } catch (err) {
        return res.json({status: "error", error: err.toString()})
    }

})

//get
router.get("/get", async (req, res) => {
    const db = req.db
    try {
        data = await db.collection("students").find({name:"Hriday Halder"}).toArray()
        res.json({status: "success", data: data})
    } catch (err) {
        return res.json({status: "error", error: err.toString()})
    }
})

////Get one
router.get("/getOne/:id", async (req, res) => {
    const db = req.db
    const ID = req.params.id
    try {
        data= await db.collection("students").findOne({_id: new ObjectId(ID)})
        res.json({status: "success", data: data})
    }
    catch (err){
        return res.json({status: "error", error: err.toString()})
    }
})

// Data update Routes
router.post("/update/:id", async (req, res) => {
    const db = req.db
    const id = req.params.id
    const reqBody = req.body
    try {

        data=await db.collection("students").updateOne({_id: new ObjectId(id)},{$set:reqBody})
        res.json({status: "success", data: data})
    }
    catch (err){
        return res.json({status: "error", error: err.toString()})
    }
})


// DeletOne  Routes
router.delete("/delete/:id", async (req, res) => {
    const db = req.db
    const id = req.params.id
    const reqBody = req.body
    try {

        data=await db.collection("students").deleteOne({_id: new ObjectId(id)})
        res.json({status: " Delete successful",})
    }
    catch (err){
        return res.json({status: "error", error: err.toString()})
    }
})

// deleteAll Routes
router.delete("/deleteAll", async (req, res) => {
    const db = req.db

    try {

        data=await db.collection("students").deleteMany({})
        res.json({status: "All Delete successful",})
    }
    catch (err){
        return res.json({status: "error", error: err.toString()})
    }
})








module.exports = router;