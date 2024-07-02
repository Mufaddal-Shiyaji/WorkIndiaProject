const mysql = require("mysql");
const express = require("express");
let userRouter = require("./Routes/userRoutes.js");
let restaurantsRouter = require("./Routes/restaurantsRouter.js");
const app = express();

app.listen("3000", () => {
  console.log("Server started on Port 3000");
});

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#M1u6ff9i3",
  database: "demo",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to Database");
});

app.post("/addPostData", (req, res) => {
  const post = req.body;
  const sql = "INSERT INTO Posts SET ?";
  db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding post");
      return;
    }
    console.log(result);
    res.send("Post added...");
  });
});

app.delete("/deletePost/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Posts WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting post");
    }
    res.send("Post deleted...");
  });
});

app.get("/getPosts/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Posts WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching posts");
      return;
    }
    res.json(results);
  });
});

app.put("/updatePost/:id", (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const sql = `UPDATE Posts SET title = '${newTitle}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating post");
      return;
    }
    res.send("Post updated...");
  });
});

app.use("/api/user", userRouter);
app.use("/api/restaurants", restaurantsRouter);

export { db };
