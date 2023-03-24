const express = require('express');
const server = express();
const projectsRouter = require('../api/projects/projects-router')
const actionsRouter = require('../api/actions/actions-router')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json())

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Hello from sprint 13 Challenge!</h2>`);
});



module.exports = server;
