const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Mydata = require("./models/mydataSchema");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.get("/models/index.html", (req, res) => {
  res.send("<h1>تم ارسال البيانات بنجاح</h1>");
});

mongoose
  .connect(
    "mongodb+srv://nezar:z5ICY3aeuAV3Ti19@cluster0.zdagyii.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const mydata = new Mydata(req.body);
  mydata
    .save()
    .then(() => {
      res.redirect("/models/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});
