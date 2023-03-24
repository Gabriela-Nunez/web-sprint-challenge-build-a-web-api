// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
  try{
    const action = await Action.get(req.params.id)
    if(!action) {
      res.status(404).json({
        message: 'action not found'
      })
    } else {
      req.action = action
      next()
    }
  }catch(err){
    res.status(500).json({
      message: 'Sorry, unable to find action'
    })
  }
}


async function validateActionInfo(req, res, next) {
  const {project_id, description, notes, completed} = req.body;
  if(req.method === 'PUT') {
      if(
          !project_id 
          || !description 
          || !notes 
          || !(completed === false || completed === true)) 
      {
          res.status(400).json({
            message: 'name, description, notes, and completed are needed'
          })
      } else {
          next();
      }
  } else {
      if(!project_id || !description || !notes) {
          res.status(400).json({
            message: 'name, description, notes are needed'
          })
      } else {
          next();
      }
  }
}

module.exports = {
  validateActionId,
  validateActionInfo,
}