const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
const reusedMethod = require("./reusedMethod");
// create application/json parser
let rectanglesData = JSON.parse(
  fs.readFileSync("./public/data.json").toString()
);

app.get("/rectanglesData", (req, res) => {
  res.status(200).send(rectanglesData);
});

app.get("/rectanglesData/:id", (req, res) => {
  const id = req.params.id;
  if (typeof id !== "undefined") {
    let foundRect = rectanglesData.find(
      (rectangle) => rectangle.id === Number(id)
    );
    if (!foundRect) {
      return res.status(404).send({ error: "no rectangle found !" });
    }
    res.status(200).send(foundRect);
  } else {
    return res.status(404).send({ error: "no id" });
  }
});

app.post("/setPosition/", (req, res) => {
  try {
    const updatedRectanglesData = reusedMethod(req, res, rectanglesData);
    if (updatedRectanglesData.error)
      return res.status(400).send({ msg: "no id" });
    fs.writeFileSync(
      "./public/data.json",
      JSON.stringify(updatedRectanglesData)
    );
    res.status(200).send(updatedRectanglesData);
  } catch (error) {
    res.status(500).send({ msg: "err" });
  }
});

app.post("/setCornerRadius/", (req, res) => {
  try {
    const updatedRectanglesData = reusedMethod(req, res, rectanglesData);
    if (updatedRectanglesData.error)
      return res.status(400).send({ msg: "no id" });
    fs.writeFileSync(
      "./public/data.json",
      JSON.stringify(updatedRectanglesData)
    );
    res.status(200).send(updatedRectanglesData);
  } catch (error) {
    res.status(500).send({ msg: "err" });
  }
});

app.post("/setSize/", (req, res) => {
  try {
    const updatedRectanglesData = reusedMethod(req, res, rectanglesData);
    if (updatedRectanglesData.error)
      return res.status(400).send({ msg: "no id" });
    fs.writeFileSync(
      "./public/data.json",
      JSON.stringify(updatedRectanglesData)
    );
    res.status(200).send(updatedRectanglesData);
  } catch (error) {
    res.status(500).send({ msg: "err" });
  }
});

app.listen(process.env.PORT || PORT, (err) =>
  err ? console.log(err) : console.log("Server running on port " + PORT)
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
  res.sendFile("./public/css/index.css", { root: __dirname });
});
