const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//modifier le level par ID//
router.put('/:id', (req, res) => {
  const levelId = req.params.id
  const levelPropsToUpdate = req.body
  mysql.query(
    'UPDATE level set ? WHERE level.level_id = ?',
    [levelPropsToUpdate, levelId],
    err => {
      if (err) {
        res.status(500).send(err + 'error updated')
      } else {
        res.status(200).send('level update')
      }
    }
  )
})

//appeler tous les level//
router.get('/', (req, res) => {
  mysql.query('SELECT * FROM level', (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
