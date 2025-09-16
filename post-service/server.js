const express = require("express");
const app = express();
app.use(express.json());

let posts = [
  { id: 1, title: "Hello World", userId: 1 },
  { id: 2, title: "My second post", userId: 2 },
];

// Get all posts
app.get("/posts", (req, res) => res.json(posts));

// Add post
app.post("/posts", (req, res) => {
  const newPost = { id: posts.length + 1, ...req.body };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  posts[index] = { id, ...req.body };
  res.json(posts[index]);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== id);
  res.json({ message: "Post deleted" });
});

app.listen(5000, () => console.log("Post service running on port 5000"));
