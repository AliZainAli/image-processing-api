import express from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

export const imageProcessing = (fileName: string, width:string, height:string) => {
  const img = path.join(__dirname, '../images/full/' + fileName + '.jpg') // input image
  const imageWidth = parseInt(width as string)
  const imageHeight = parseInt(height as string)
  const outputImage = path.join(__dirname, '../images/thumb/' + fileName + '_' + imageWidth + '_' + imageHeight + '.jpg') // output image

  // check if output image already exists, return it without resizing
  if (fs.existsSync(outputImage)) {
    console.log('output image exists')
    return outputImage
  } else {
    console.log('resizing')
    try {
      sharp(img)
        .resize(imageWidth, imageHeight)
        .toFile(outputImage)
        .then(() => {
        return outputImage
    })
    } catch (error) {
        return false
    }
  }
}