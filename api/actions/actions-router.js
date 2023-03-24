// Write your "actions" router here!
const express = require('express');
const { validateActionId, validateActionInfo} = require('./actions-middlware');

const Action = require('./actions-model');

const router = express.Router();

//ENDPOINTS
router.get('/', (req, res, next) => {
  Action.get()
  .then(actions => {
    if(actions) {
      res.status(200).json(actions)
    } else {
      res.json([])
    }
  })
})

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)
})

router.post('/', validateActionInfo, (req, res, next) => {
  Action.insert(req.body)
  .then(newAction => {
    res.status(201).json(newAction)
  })
  .catch(next)
})

router.put('/:id', validateActionId, validateActionInfo, async(req, res, next) => {
  try{
    const updatedAction = await Action.update(req.params.id, req.body)
    res.status(200).json(updatedAction)
  }catch(err){
    next(err)
  }
})

router.delete('/:id', validateActionId, async(req, res, next) => {
  try{
    const actions = await Action.remove(req.params.id)
    res.json(actions)
  }catch(err){
    next(err)
  }
})

//ERROR HANDLING
router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong in actions router',
    err: err.message,
    stack: err.stack
  })
})

module.exports = router;
