const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3001;
const mytoken = "INDIA";
const TOKEN = "EAAJipALMgScBO7JvbZBuWZBQYoiWtDqCjvoAZAZCZBLb3bHjS8iqrM0F24VYQXoebNhBUWMWXEOQ8iHt9j5QO9zsnB9xZAKTO4oKCQvmLQAZBlFNm7ZBJSmZCWlxEIbnharxTaNCUtanEgsxn4wmR5UznpJLm5aAjZB1N1kgqZAreu3m03nEz90It19MPbZBap6OsCP4dXo9L4LyNs9KHvFbhYzexnXXHbMZD";

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

app.post("/webhook", async (req, res)=>{
    const data = req.body;
    console.log("post req aa gyi")
    console.log(data);
    if(data && data.entry && data.entry[0].changes && data.entry[0].changes[0].value && data.entry[0].changes[0].value.metadata && data.entry[0].changes[0].value.metadata.phone_number_id && data.entry[0].changes[0].value.messages && data.entry[0].changes[0].value.messages[0]){
        // console.log(data.entry[0].changes[0]);
        // console.log(data.entry[0].changes[0].value.messages[0]);

       const response = await axios({
        method: "POST",
        url: "https://graph.facebook.com/v17.0/"+ data.entry[0].changes[0].value.metadata.phone_number_id + "/messages",
        headers: {
            Authorization: "Bearer " + TOKEN,
            "Content-Type" : "application/json"
        },
        data: {
                "messaging_product": "whatsapp",
                "to": data.entry[0].changes[0].value.messages[0].from,
                "text": {
                    body : "hi this is reply from MRIDUL'S server"
                }
                }
        }
       );

       res.status(200).send("success");

    }
    else{
        res.status(404).send("error occured");
    }
    


})

app.get("/", (req, res)=>{
    res.send("hii webhook setting")
})