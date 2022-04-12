const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/assets", express.static(path.join(__dirname, "assets"), {dotfiles: 'allow'}))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "html", "index.html"))
})

app.post("/save", async(req, res) => {
  try {
    const {config, filename} = req.body;
    fs.writeFileSync(path.join(__dirname, "assets", "files", filename), config)
    res.status(200).json({message: 'OK'})
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(8080, () => {
  console.log("Listening on port: 8080")
})