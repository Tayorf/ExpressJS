const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

let app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/contact-info", (req, res) => {
    fs.readFile("formsubmissions.json", (err, data) => {
        const formData = JSON.parse(data);
        formData.push(req.body);
    })
    fs.appendFile("formsubmissions.json", JSON.stringify(formData), (err) => {
      console.log(err)

    })
    res.send("Contact submitted");
    next();
    
})


app.get("/formsubmissions", (req, res) => {
    fs.readFile("formsubmissions.json", (err, data) => res.send(data));
});

app.use(express.static("public"));

app.listen(3000);