// add middlewares here related to projects
const Project = require('./projects-model')


async function validateProjectId(req, res, next) {
  try{
    const project = await Project.get(req.params.id)
    if(!project) {
      res.status(404).json({
        message: 'project not found'
      })
    } else {
      req.project = project
      next()
    }

  }catch(err){
    res.status(500).json({
      message: 'Sorry, unable to find project'
    })
  }
}

function validateProject(req, res, next) {
  try{
    const { name, description } = req.body;
    if(!name ||  !description) {
      res.status(400).json({
        message: "missing required name field"
      })
    } else {
      next()
    }
  }catch(err){
    res.status(500).json({
      message: 'Sorry, unable to update project'
    })
  }
}

module.exports = {
  validateProjectId,
  validateProject,
}