const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {

  let msg = req.body.message;

  let response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model:"gpt-4o-mini",
      messages:[{role:"user", content: msg}]
    })
  });

  let data = await response.json();

  res.json({reply: data.choices[0].message.content});
});

app.listen(3000, ()=> console.log("Running"));
