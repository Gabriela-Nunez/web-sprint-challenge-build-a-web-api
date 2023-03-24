// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProject, validateProjectInfo } = require('./projects-middleware');

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

router.put('/:id',validateProjectId, validateProjectInfo, async (req, res, next) => {
  try {
      const updatedProject = await Project.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
  } catch(err) {
      next(err);
  }
})
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try{
    await Project.remove(req.params.id)
    res.json(req.project)
  }catch(err){
    next(err)
  }
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