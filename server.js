const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');

const app = express();
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // Replace with your secret key

const login = (req, res) => {
  const { username, password } = req.body;

  const dbPath = path.resolve(__dirname, 'db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const users = db.users;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token: token
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const protectedRoute = (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
};

// Middleware function to integrate with json-server
module.exports = (req, res, next) => {
  if (req.path === '/login') {
    return login(req, res);
  }
  if (req.path === '/protected') {
    return authenticateToken(req, res, next);
  }
  next();
};
