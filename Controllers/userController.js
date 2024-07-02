import db from "../main.js";

const createUsers = (req, res) => {
  const search = `SELECT user_id FROM Users WHERE email='${req.body.email}'`;
  db.query(search, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error searching user");
      return;
    }
    if (result.length > 0) {
      res.status(400).send("User already exists");
      return;
    }
    const sql = "INSERT INTO Users SET ?";
    db.query(sql, post, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding user");
        return;
      }
      console.log(result);
      res.status(200).send("User added...");
    });
  });
};

const loginUsers = (req, res) => {
  const { email, user_password } = req.body;
  const search = `SELECT * FROM Users WHERE email='${email}'`;
  db.query(search, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error searching user");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("User doesn't exist");
      return;
    }
    const sql = `SELECT * FROM Users WHERE email='${email}' AND user_password='${user_password}'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error logging in");
        return;
      }
      if (result.length <= 0) {
        res.status(400).send("Invalid credentials");
      }
      console.log(result);
      res.status(200).send(result);
    });
  });
};

const getUsers = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Users WHERE user_id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching user");
      return;
    }
    res.json(results);
  });
};

export { getUsers, createUsers, loginUsers };
