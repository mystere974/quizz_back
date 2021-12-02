const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//route pour une seule question//
router.get('/:id', (req, res) => {
  const id = req.params.id
  mysql.query(
    'SELECT * FROM questions AS q JOIN exact_response AS er ON er.exact_response_id=q.exact_response_exact_response_id WHERE q.questions_id=?',
    [id],
    (err, result) => {
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

//route pour toutes les questions//
router.get('/', (req, res) => {
  mysql.query(
    'SELECT * FROM questions AS q JOIN exact_response AS er ON er.exact_response_id=q.exact_response_exact_response_id',
    (err, result) => {
      if (err) {
        res.status(500).send(err)
      } else {
        mysql.query(
          'SELECT lhq.questions_questions_id,l.* FROM level_has_questions AS lhq LEFT JOIN level AS l ON lhq.level_level_id = l.level_id',
          (err, result2) => {
            if (err) {
              res.status(500).send('2nd error')
            } else {
              mysql.query(
                'SELECT qhr.questions_questions_id,r.* FROM questions_has_responses AS qhr LEFT JOIN responses AS r ON qhr.responses_responses_id = r.responses_id',
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

//route pour modifier une question par ID//
router.put('/:id', (req, res) => {
  const id = req.params.id
  const questionsPropsToUpdate= req.body
  mysql.query(
    'UPDATE questions SET ? WHERE questions.questions_id = ?',
    [questionsPropsToUpdate, id],
    err => {
      if (err) {
        res.status(500).send(err + 'error updated')
      } else {
        res.status(200).json(questionsPropsToUpdate)
      }
    }
  )
})
module.exports = router
