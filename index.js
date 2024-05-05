const express = require('express');
const bodyParser = require("body-parser");
const news = require("./News/news");
const characters = require("./Characters/characters");

const app = express();

app.use(bodyParser.json());


app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use("/news", news);
app.use("/characters", characters);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});