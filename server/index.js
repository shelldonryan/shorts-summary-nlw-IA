import cors from 'cors'
import express from 'express'

import {download} from './download.js'

const app = express()
app.use(cors())

app.get('/summary/:id', (request, response) => {
  download(request.params.id)
  response.json({result: "Download was sucessful"})
})

app.listen(1502, () => console.log("The server is running on port 1502"))
