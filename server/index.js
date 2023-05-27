import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // MySQL root Password
  database: "inventory",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello this is the Backend of the Inventory App");
});

app.get("/items", (req, res) => {
  const sqlSelect = "SELECT * FROM items";
  db.query(sqlSelect, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.post("/items", (req, res) => {
  const sqlInsert =
    "INSERT INTO items (`name`, `desc`, `thumb`, `entry`, `qty`, `sellerId`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.desc,
    req.body.thumb,
    req.body.entryDate,
    req.body.qty,
    req.body.sellerId,
  ];
  db.query(sqlInsert, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Item Added Successfully");
  });
});

app.delete("/items/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM items WHERE itemId = ?";
  const values = [req.body.itemId];
  db.query(sqlDelete, [id], (err, data) => {
    if (err) return res.json(err);
    else return res.json("Item Deleted Successfully");
  });
});

app.put("/itemUpdate", (req, res) => {
  const sqlUpdate =
    "UPDATE items SET `name` = ?, `desc` = ?, `thumb` = ?, `entry` = ?, `qty` = ?, `sellerId` = ? WHERE itemId = ?";
  const values = [
    req.body.name,
    req.body.desc,
    req.body.thumb,
    req.body.entryDate,
    req.body.qty,
    req.body.sellerId,
    req.body.itemId,
  ];
  db.query(sqlUpdate, values, (err, data) => {
    if (err) return res.json(err);
    else return res.json("Item Updated Successfully");
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
