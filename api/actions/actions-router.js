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

//ERROR HANDLING
router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong in actions router',
    err: err.message,
    stack: err.stack
  })
})

module.exports = router;
