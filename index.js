const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = 3001;
const mytoken = "INDIA";
app.use(bodyparser.json());

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
});

app.post("/webhook", (req, res)=>{
    const data = req.body;
    console.log("post req aa gyi")
    console.log(data);
    if(data && data.entry && data.entry[0].changes && data.entry[0].changes[0].value && data.entry[0].changes[0].value.metadata && data.entry[0].changes[0].value.metadata.phone_number_id && data.entry[0].changes[0].value.messages && data.entry[0].changes[0].value.messages[0]){
        console.log(data.entry[0].changes[0]);
        console.log(data.entry[0].changes[0].value.messages[0]);
    }
    


})

app.get("/", (req, res)=>{
    res.send("hii webhook setting")
})