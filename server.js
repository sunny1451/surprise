const express = require("express");
const fs = require("fs");
const session = require("express-session");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret_key_change_later",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

// ✅ Auth middleware
function checkAuth(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect("/");
  }
}

// ✅ Protected route
app.get("/video.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "video.html"));
});

// ✅ Static files (login page, css, js, images)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Login API
app.post("/login", (req, res) => {
  const user = JSON.parse(fs.readFileSync("user.json", "utf8"));
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

// ✅ REQUIRED for cloud deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port:", PORT);
});
