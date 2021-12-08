const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//modifier une exact_response par ID//
router.put('/:id', (req, res) => {
  const exactResponseId = req.params.id
  const PropsToUpdate = req.body
  mysql.query(
    'UPDATE level set ? WHERE level.level_id = ?',
    [PropsToUpdate, exactResponseId],
    err => {
      if (err) {
        res.status(500).send(err + 'error updated')
      } else {
        res.status(200).send('level update')
      }
    }
  )
})

//appeler toutes les exact_response//
router.get('/', (req, res) => {
  mysql.query('SELECT * FROM exact_response', (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
