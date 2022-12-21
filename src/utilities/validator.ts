import express from 'express'
import fs from 'fs'
import path from 'path'

const validator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const url = req.url
  console.log(`${url} was visited`)
  const filename = req.query.filename
  // filename not in query
  if (!filename) {
    res.status(400)
    res.send('filename is missing')
    return
  }

  const imageName = req.query.filename
  const img = path.join(__dirname, '../images/full/' + imageName + '.jpg') // input image

  // input image not found
  if (!fs.existsSync(img)) {
    res.status(400)
    res.send('Source Image is missing')
    return
  }
  const imageWidth = parseInt(req.query.width as string)
  const imageHeight = parseInt(req.query.height as string)

  if (!imageWidth || imageWidth <= 0) {
    res.status(400)
    res.send('Width must be integer greater than 0')
    return
  }
  if (!imageHeight || imageHeight <= 0) {
    res.status(400)
    res.send('Height must be integer greater than 0')
  } else {
    next()
  }
}

export default validator
