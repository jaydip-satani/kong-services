const express = require("express");
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Get all users
app.get("/users", (req, res) => res.json(users));

// Add user
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users[index] = { id, ...req.body };
  res.json(users[index]);
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter((u) => u.id !== id);
  res.json({ message: "User deleted" });
});

app.listen(4000, () => console.log("User service running on port 4000"));
