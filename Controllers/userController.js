import db from "../main.js";

const createUsers = (req, res) => {
  const post = req.body;
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
      console.log(result);
      res.status(200).send(result);
    });
  });
};

const getUsers = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Users WHERE id = ${id}`;
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

//mongo
// const create = async (req, res) => {
//   const user = req.body;
//   const u = await User.findOne({ email: user.email });
//   if (u != null) {
//     res.status(400).json({ message: "User already exists" });
//     return;
//   }
//   const newUser = new User(user, bcrypt.hash(user.password, 12));
//   try {
//     await newUser.save();
//     const token = jwt.sign({ email: user.email, id: user._id }, "test", {
//       expiresIn: "1h",
//     });
//     console.log(token);
//     res.status(201).json({ result: newUser, token });
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(404).json({ message: "User doesn't exist" });
//       return;
//     }
//     const isPasswordCorrect = bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       res.status(400).json({ message: "Invalid credentials" });
//       return;
//     }
//     const token = jwt.sign({ email: user.email, id: user._id }, "test", {
//       expiresIn: "1h",
//     });
//     res.status(200).json({ result: user, token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
