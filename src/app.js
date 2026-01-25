const express = require("express")

const app = express();

const { adminAuth }= require("./middlewares/auth.js")

app.use ("/admin",adminAuth)

app.get("/user",(req,res)=>{
    res.send("User Data Sent")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deteled a user")
})
app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777....");
})

