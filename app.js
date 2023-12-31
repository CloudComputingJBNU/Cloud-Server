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
const category_add = require("./src/routes/category_add");
const user_get = require("./src/routes/user_get");
const postlist_get = require("./src/routes/postlist_get");
const user_update = require("./src/routes/user_update");
const postview_get = require("./src/routes/postview_get");
const likepost = require("./src/routes/likepost");
const like = require("./src/routes/like");

app.use("/user/add", user_add);
app.use("/post/add", post_add);
app.use("/category/get", category_get);
app.use("/category/add", category_add);
app.use("/user/get", user_get);
app.use("/postlist/get", postlist_get);
app.use("/user/update", user_update);
app.use("/like", like);
app.use("/user/postview/get", postview_get);
app.use("/like/post", likepost);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
