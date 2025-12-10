const express = require("express");
const fs = require("fs");
const session = require("express-session");
const path = require("path");
const app = express();
app.use(express.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

function checkAuth(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/");
  }
}

// Define protected routes before static middleware
app.get("/video.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "video.html"));
});

// Add similar routes here for each additional protected page, e.g.:
// app.get("/another-page.html", checkAuth, (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "another-page.html"));
// });

// Serve static files (unprotected assets and login page)
app.use(express.static("public"));

app.post("/login", (req, res) => {
  const user = JSON.parse(fs.readFileSync("user.json"));
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    req.session.authenticated = true;
    res.json({
      success: true,
      message: "YES! Welcome my love! Taking you to our secret place..."
    });
  } else {
    res.json({
      success: false,
      message: "Wrong answer baby... think harder"
    });
  }
});
app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
});