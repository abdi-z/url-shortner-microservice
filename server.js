require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
let bodyParser = require("body-parser");

const vu = require("valid-url");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//   }
// });

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
let uri =
  "mongodb+srv://abdulrehman:abdulrehman@firstcluster.vkz91.mongodb.net/abddatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: Number,
});

let Url = mongoose.model("Url", urlSchema);

app.post("/api/shorturl", function (req, res) {
  let urlVar = vu.isWebUri(req.body.url);
  // let urlRegex = new RegExp(
  //   /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  // );
  // if (!urlVar.match(urlRegex)) {
  //   res.json({
  //     error: "Invalid URL",
  //   });
  //   return;
  // }
  if (urlVar != undefined) {
    let randId = Math.floor(Math.random() * 10000);
    let newUrl = new Url({
      original_url: urlVar,
      short_url: randId,
    });
    newUrl.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.render("first.hbs", {
          original_url: data.original_url,
          short_url: data.short_url,
        });
      }
    });
  } else {
    res.json({ error: "invalid url" });
  }
});

app.get("/i/:id", (req, res) => {
  Url.findOne({ short_url: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect(data.original_url);
    }
  });
});
