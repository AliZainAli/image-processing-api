import supertest from 'supertest'
import app from '../index'
import { imageProcessing } from '../utilities/processing'
import express from 'express'
import fs from 'fs'
import path from 'path'

const req = supertest(app)

describe('Test Image processing function', () => {
    
  it('this test is for image processing and should return true', async () => {
    const outputImage = await imageProcessing('fjord', '200', '200');
    expect(outputImage).toBeTruthy()
  })
  
  it('this test is for image processing and should return false"', async () => {
    const result = await imageProcessing('fjord', '200', 'sadasd');
    expect(result).toBeFalsy()
  })
})

describe('Test endpoint response', () => {

  it('this test should return 200', async () => {
    const res = await req.get('/api/images').query({
      filename: 'fjord',
      width: 200,
      height: 200
    })
    expect(res.status).toBe(200)
  })

  it('this test should return 400 and error message "Source Image is missing"', async () => {
    const res = await req.get('/api/images').query({
      filename: 'notfound',
      width: 400,
      height: 400
    })
    expect(res.status).toBe(400)
    expect(res.text).toBe('Source Image is missing')
  })

  it('this test should return 400 and error message "Width must be integer greater than 0"', async () => {
    const res = await req.get('/api/images').query({
      filename: 'fjord',
      width: 'width',
      height: 400
    })
    expect(res.status).toBe(400)
    expect(res.text).toBe('Width must be integer greater than 0')
  })

  it('this test should return 400 and error message "Height must be integer greater than 0"', async () => {
    const res = await req.get('/api/images').query({
      filename: 'fjord',
      width: 400,
      height: 0
    })
    expect(res.status).toBe(400)
    expect(res.text).toBe('Height must be integer greater than 0')
  })
})
