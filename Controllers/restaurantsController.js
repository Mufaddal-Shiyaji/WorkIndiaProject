import db from "../main.js";

const addRestaurants = (req, res) => {
  const post = req.body;
  const search = `SELECT * FROM Restaurants WHERE phone='${req.body.phone}'`;
  db.query(search, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error searching Restaurant");
      return;
    }
    if (result.length > 0) {
      res.status(400).send("Restaurant already exists");
      return;
    }
    const sql = "INSERT INTO Restaurants SET ?";
    db.query(sql, post, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding Restaurant");
        return;
      }
      console.log(result);
      res.status(200).send(result);
    });
  });
};

const getRestaurants = (req, res) => {
  let search = `SELECT * FROM Restaurants WHERE nameR=?`;
  db.query(search, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error searching user");
      return;
    }
    if (result.length <= 0) {
      res.status(400).send("Restaurant doesnt exist");
      return;
    }

    const sql = `SELECT * FROM BookedSlots WHERE place_id=?`;
    db.query(sql, [result.place_id], (err, result2) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error getting slots");
        return;
      }
      if (result2.length <= 0) {
        res.status(200).send({ result: result, slots: "No slots available" });
      } else {
        res.status(200).send({ result: result, slots: result2 });
      }
    });
  });
};

export { addRestaurants, getRestaurants };
