import express from 'express'
import validator from './utilities/validator'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { imageProcessing } from './utilities/processing'

const app = express()
const port = 3000

app.get('/api/images', validator, async (req, res) =>  {
    // imageProcessing (req.query.filename as string, req.query.width as string, req.query.height as string)
    const result = await imageProcessing (req.query.filename as string, req.query.width as string, req.query.height as string)
    if (result) {
        res.status(200)
        res.sendFile(result as string)
        return true
    } else {
        res.status(400)
        res.send('image processing failed, please check parameters')
        return false
    }
})

app.listen(port, () => {
  console.log(`Server is starting at http://localhost:${port}`)
})

export default app
