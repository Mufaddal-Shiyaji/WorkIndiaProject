import mysql from "mysql";
import express from "express";
import userRouter from "./Routes/userRoutes.js";
import restaurantsRouter from "./Routes/restaurantsRouter.js"; // Uncomment if you have this file

const app = express();

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

app.use("/api/user", userRouter);
app.use("/api/restaurants", restaurantsRouter); // Uncomment if you have this file

app.listen(3000, () => {
  console.log("Server started on Port 3000");
});

export default db;
