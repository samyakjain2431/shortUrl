const express = require("express");
const bodyParser = require("body-parser");

const passport = require('./auth');
const { connectToMongoDB } = require('./connection');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const { handleRedirectUrl } = require('./redirectUrl');

const port = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("mongodb connected"));

app.use(passport.initialize());
const authenticateUser = passport.authenticate('local', { session: false });

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/url", authenticateUser, urlRoute);
app.use("/api/user", userRoute);

app.get("/:shortId", handleRedirectUrl);

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });