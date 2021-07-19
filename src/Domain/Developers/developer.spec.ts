import { Router } from './index'
import request from 'supertest'
import express from 'express'
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use('/developer', Router)
// TODO: tests are not working yet, this things are just placing holders
test('index route works', done => {
  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200, done)
})
