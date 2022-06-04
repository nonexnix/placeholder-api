import express, { Request, Response } from 'express'
import database from '../library/database'

const app = express()

app.get('/', async (request, response) => {
  const users = await database.user.findMany()
  response.status(200).json(users)
})

app.listen(3001)
