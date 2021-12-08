const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//modifier une responses par ID//
router.put('/:id', (req, res) => {
  const responsesId = req.params.id
  const responsesPropsToUpdate = req.body
  mysql.query(
    'UPDATE level set ? WHERE level.level_id = ?',
    [responsesPropsToUpdate, responsesId],
    err => {
      if (err) {
        res.status(500).send(err + 'error updated')
      } else {
        res.status(200).send('level update')
      }
    }
  )
})

//appeler toutes les responses//
router.get('/', (req, res) => {
  mysql.query('SELECT * FROM responses', (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
