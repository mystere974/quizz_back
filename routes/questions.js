const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/:id', (req, res) => {
  const id = req.params.id
  mysql.query(
    'SELECT * FROM questions AS q JOIN exact_response AS er ON er.exact_response_id=q.exact_response_exact_response_id WHERE q.questions_id=?',
    [id],
    (err, result) => {
      /* `SELECT * FROM questions JOIN level ON level_id=questions.questions_id JOIN questions_has_responses AS qhr ON questions_id=questions_questions_id JOIN responses ON responses_id=qhr.responses_responses_id WHERE questions_id= ?` */
      if (err) {
        res.status(500).send(err)
      } else {
        mysql.query(
          'SELECT lhq.questions_questions_id,l.* FROM level_has_questions AS lhq LEFT JOIN level AS l ON lhq.level_level_id = l.level_id WHERE lhq.questions_questions_id=?',
          [id],
          (err, result2) => {
            if (err) {
              res.status(500).send('2nd error')
            } else {
              mysql.query(
                'SELECT qhr.questions_questions_id,r.* FROM questions_has_responses AS qhr LEFT JOIN responses AS r ON qhr.responses_responses_id = r.responses_id WHERE qhr.questions_questions_id= ?',
                [id],
                (err, result3) => {
                  if (err) {
                    res.status(500).send(err)
                  } else {
                    res.status(200).json({
                      result,
                      result2,
                      result3
                    })
                  }
                }
              )
            }
          }
        )
      }
    }
  )
})

module.exports = router
