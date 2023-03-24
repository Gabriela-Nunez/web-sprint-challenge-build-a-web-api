// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProject } = require('./projects-middleware');

const Project = require('./projects-model')

const router = express.Router();

//ENDPOINTS
router.get('/', (req, res, next) => {
  Project.get()
      .then(projects => {
          if (projects) {
              res.status(200).json(projects)
          } else {
              res.json([])
          }
      })
      .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
  Project.insert(req.body)
  .then(newProject => {
    res.status(201).json(newProject)
  })
  .catch(next)
})

//ERROR HANDLING
router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong in projects router',
    err: err.message,
    stack: err.stack
  })
})

module.exports = router;