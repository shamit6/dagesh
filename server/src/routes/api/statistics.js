import express from 'express'
import db from '../../db'

const router = express.Router()

router.get('/statistics/amounts', (req, res) => {

  const { field, startDate, minRows } = req.query;

  let sql = `SELECT ${field} as field, count(*) as amount
               FROM inquiries i
              WHERE date(?)<date(i.date)
           GROUP BY ${field}
             HAVING ? <= count(*) `

  db.all(sql, [startDate, parseInt(minRows)], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows)
  });
})

router.get('/statistics/periods', (req, res) => {

  const { field, startDate, minRows } = req.query;

  let sql = `SELECT  ${field} as field, CAST(strftime('%m', i.date) as INTEGER) as month, count(*) as amount
               FROM inquiries i
              WHERE date(?)<date(i.date)
           GROUP BY ${field}, strftime('%m', i.date)
           HAVING ? <= count(*)`

  db.all(sql, [startDate, parseInt(minRows)], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows)
  });
})

export default router
