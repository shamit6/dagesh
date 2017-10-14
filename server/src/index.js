import express from 'express'
import path from 'path'
import inquiriesRoutes from './routes/api/inquiries'
import decodersRoutes from './routes/api/decoders'
import statisticsRoutes from './routes/api/statistics'
import {devMiddleware, hotMiddleware} from './routes/webpack'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 5000

const STATIC_FILES_DIRECTORY = path.join(__dirname,'../../client/static')
const INDEX_HTML_PATH = path.join(STATIC_FILES_DIRECTORY, 'index.html')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(devMiddleware())
app.use(hotMiddleware())

app.use('/inquiries', express.static(INDEX_HTML_PATH))
app.use('/inquiry*', express.static(INDEX_HTML_PATH))
app.use('/statistics*', express.static(INDEX_HTML_PATH))
app.use('/', express.static(INDEX_HTML_PATH))


app.use('/api', inquiriesRoutes)
app.use('/api', decodersRoutes)
app.use('/api', statisticsRoutes)

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`)
})
