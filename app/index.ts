import express, { Request, Response } from 'express'
import database from '../library/database'

const app = express()
const port = process.env.PORT || 8080

app.get('/api/users', async (request: Request, response: Response) => {
  const { method } = request
  if (method !== 'GET') response.status(400).json({ message: 'error' })
  try {
    const users = await database.user.findMany()
    response.status(200).json(users)
  } catch (error) {
    response.status(500).json({ message: error })
  }
})

app.get('/api/users/:id', async (request: Request, response: Response) => {
  const { method } = request
  if (method !== 'GET') response.status(400).json({ message: 'error' })
  try {
    const { id } = request.params
    const users = await database.user.findUnique({
      where: { id },
    })
    response.status(200).json(users)
  } catch (error) {
    response.status(500).json({ message: error })
  }
})

app.get('/api/posts', async (request: Request, response: Response) => {
  const { method } = request
  if (method !== 'GET') response.status(400).json({ message: 'error' })
  try {
    const posts = await database.post.findMany()
    response.status(200).json(posts)
  } catch (error) {
    response.status(500).json({ message: error })
  }
})

app.get('/api/posts/:id', async (request: Request, response: Response) => {
  const { method } = request
  if (method !== 'GET') response.status(400).json({ message: 'error' })
  try {
    const { id } = request.params
    const posts = await database.post.findUnique({
      where: { id },
    })
    response.status(200).json(posts)
  } catch (error) {
    response.status(500).json({ message: error })
  }
})

app.listen(port)
