import express from 'express'
import validator from './utilities/validator'
import sharp from 'sharp'
import fs from 'fs'

const app = express()
const port = 3000

app.get('/api/images', validator, (req, res) => {
  const imageName = req.query.filename
  const img = __dirname + '/images/full/' + imageName + '.jpg' // input image
  const imageWidth = parseInt(req.query.width as string)
  const imageHeight = parseInt(req.query.height as string)
  const outputImage =
    __dirname +
    '/images/thumb/' +
    imageName +
    '_' +
    imageWidth +
    '_' +
    imageHeight +
    '.jpg' // output image

  // check if output image already exists, return it without resizing
  if (fs.existsSync(outputImage)) {
    console.log('output image exists')
    res.sendFile(outputImage)
  } else {
    console.log('resizing')
    // general try catch block if resizing failed
    try {
      sharp(img)
        .resize(imageWidth, imageHeight)
        .toFile(outputImage)
        .then(() => {
          res.sendFile(outputImage)
        })
    } catch (error) {
      res.status(400)
      res.send('image processing failed, please check parameters')
      return
    }
  }
})

app.listen(port, () => {
  console.log(`Server is starting at http://localhost:${port}`)
})

export default app
