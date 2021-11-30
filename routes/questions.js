const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM questions JOIN level ON level_id=questions.questions_id JOIN questions_has_responses AS qhr ON questions_id=questions_questions_id JOIN responses ON responses_id=qhr.responses_responses_id WHERE questions_id= ?`
  mysql.query(sql, id, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
