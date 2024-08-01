const express = require("express");
const bodyParser = require("body-parser");

const { connectToMongoDB } = require('./connection');
const URL = require("./models/url");
const urlRoute = require('./routes/url');

const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("mongodb connected"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/url", urlRoute);

const shortIdFunc = async (req, res) => {
  const shortId = req.params.shortId;
  console.log(`Received shortId: ${shortId}`);
  try {
    const data = await URL.findOneAndUpdate(
      { shortId: shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // to return the modified document
    );
    console.log(data);
    if (data && data.redirectURL) {
      res.redirect(data.redirectURL); // Default 302 redirect
    } else {
      res.status(404).send('Entry not found or redirectURL missing');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

app.get("/:shortId", shortIdFunc);

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
