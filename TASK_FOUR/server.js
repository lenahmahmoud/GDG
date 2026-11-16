import express from "express";
import dbConnection from "./connection.js";
import usersModel from "./userModel.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = 5000;

app.use(express.json());
dbConnection();

app.get("/", (req, res) => {
  res.json({ message: "base url" });
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || !gender) {
      return res.status(400).json({ message: "missing fields" });
    }

    const isFound = await usersModel.findOne({ email });
    if (isFound) {
      return res.status(409).json({ message: "user already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await usersModel.create({ username, email, gender, password: hashed });

    return res.status(201).json({ message: "created", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await usersModel.find();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

app.get("/users/by-email", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "missing field" });
    }

    const user = await usersModel.findOne({ email }).select("username");

    if (!user) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});