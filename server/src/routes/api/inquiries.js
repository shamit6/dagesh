import express from 'express'
import db from '../../db'

const router = express.Router()

router.get('/inquiries/:id', (req, res) => {
  let sql = `SELECT rowid as id, * FROM inquiries WHERE rowid = ?`;

  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(row)
  });
})

router.get('/inquiries', (req, res) => {
  let sql = `SELECT rowid as id, *
              FROM inquiries
            WHERE scopeKey = ifnull(?,scopeKey)
              AND sectionKey = ifnull(?,sectionKey)
              AND date(date) >= date(ifnull(?,date))
              AND date(date) <= date(ifnull(?,date))`

  const { scopeKey, sectionKey, startDate, endDate } = req.query

  db.all(sql, [scopeKey, sectionKey, startDate, endDate], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
})

router.post('/inquiries', (req, res) => {
  let sql = `INSERT INTO inquiries(name,scopeKey,sectionKey,event,reason,howToImprove,date,email)
            VALUES(?,?,?,?,?,?,?,?)`
  const { name,scopeKey,sectionKey,event,reason,howToImprove,date,email } = req.body

  db.run(sql, [name,scopeKey,sectionKey,event,reason,howToImprove,date,email], function(err){
    if (err) {
      return res.status(500).json(err);
    }
    res.json({inquiryId:this.lastID})
  })
})

export default router
