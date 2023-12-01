const PORT = 3000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
const user_add = require("./src/routes/user_add");
const post_add = require("./src/routes/post_add");
const category_get = require("./src/routes/category_get");

app.use("/user/add", user_add);
app.use("/post/add", post_add);
app.use("/category/get", category_get);

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
