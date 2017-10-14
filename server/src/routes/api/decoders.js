import express from 'express'
import db from '../../db'

const router = express.Router()

router.get('/decoders', (req, res) => {

  const decoders = {}

  db.serialize(() => {
    db.all(`select * from scopeTypes`, [], (err, rows ) => {
      decoders.scopeTypes = rows
    })
    db.all(`select * from sectionTypes`, [], (err, rows ) => {
      decoders.sectionTypes = rows
      res.json(decoders)
    })
  })
})


export default router
