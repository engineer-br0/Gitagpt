const express = require('express');

const app = express();
const PORT = 4000;
const mytoken = "INDIA"

app.listen(PORT, (req, res)=>{
    console.log(`Webhook is running on port ${PORT}`);
});

app.get('/webhook', (req, res)=>{
    console.log("aa gyi req")
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query['hub.verify_token'];

    console.log(mode, challenge, token);

    if(mode && token){
        if(mode === "subscribe" && token === mytoken){
            res.status(200).send(challenge);
        }
        else{
            res.status(404);
        }
    }
})

app.get("/", (req, res)=>{
    res.send("hii webhook setting")
})