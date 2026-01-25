const express = require("express")

const app = express();


app.use("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send("FirstName:Rahul, LastName:Kumar!");
});


app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777....");
})

