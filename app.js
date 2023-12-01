const PORT = 3000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
const user_add = require("./src/routes/user_add");
const post_add = require("./src/routes/post_add");

app.use("/user/add", user_add);
app.use("/post/add", post_add);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
