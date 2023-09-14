import cors from 'cors'
import express from 'express'

import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (request, response) => {
  await download(request.params.id)
  const result = await transcribe()

  console.log(result)

  return response.json({result: result})
})

app.post('/summary', async (request, response) => {
  const result = await summarize(request.body.text)

  console.log(result)

  return response.json({result: result})
})

app.listen(1502, () => console.log("The server is running on port 1502"))
