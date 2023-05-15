import express, { Request, Response } from 'express'
import cors from 'cors'
import pdf from 'pdf-creator-node'
import fs, { read, readFileSync } from 'fs'
import path, { dirname } from 'path'
import { createReport } from './controllers/report'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', (req: Request, res: Response) => {
  const data = req.body
  const template = fs.readFileSync('./template/index.html', 'utf8')
})

app.post('/generate', createReport)

app.listen(8002, () => console.log('listening on 8002'))