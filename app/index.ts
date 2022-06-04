import express, { Request, Response, urlencoded } from 'express'
import database from '../library/database'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 8080

app.get('/users/', async (request: Request, response: Response) => {
  try {
    const users = await database.user.findMany()
    response.status(200).json(users)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Error' })
  }
})

app.post('/users/', async (request: Request, response: Response) => {
  try {
    const user = await database.user.create({
      data: {
        email: request.body.email,
        username: request.body.username,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        image: request.body.image,
      },
    })
    response.status(201).json(user)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Error' })
  }
})

app.get('/users/:userId', async (request: Request, response: Response) => {
  try {
    const user = await database.user.findUnique({
      where: { id: request.params.userId },
    })
    response.status(200).json(user)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Error' })
  }
})

app.put('/users/:userId', async (request: Request, response: Response) => {
  const { key, value } = request.body
  try {
    const user = await prisma.user.update({
      where: { id: request.params.userId },
      data: {
        [key]: value,
      },
    })
    response.status(200).json(user)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Error' })
  }
})

app.delete('/users/:userId', async (request: Request, response: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: request.params.userId },
    })
    response.status(200).json(user)
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: 'Server Error' })
  }
})

// ! ------------------------------------

app.get(
  '/users/:userId/posts',
  async (request: Request, response: Response) => {
    try {
      const posts = await prisma.post.findMany({
        where: { userId: request.params.userId },
      })
      response.status(200).json(posts)
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: 'Server Error' })
    }
  }
)

app.post(
  '/users/:userId/posts',
  async (request: Request, response: Response) => {
    try {
      const posts = await database.post.create({
        data: {
          id: request.body.id,
          title: request.body.title,
          caption: request.body.caption,
          userId: request.params.userId,
        },
      })
      response.status(201).json(posts)
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: 'Server Error' })
    }
  }
)

app.get(
  '/users/:userId/posts/:postId',
  async (request: Request, response: Response) => {
    try {
      const posts = await prisma.post.findMany({
        where: { id: request.params.postId },
      })
      response.status(200).json(posts)
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: 'Server Error' })
    }
  }
)

app.put(
  '/users/:userId/posts/:postId',
  async (request: Request, response: Response) => {
    const { key, value } = request.body
    try {
      const post = await prisma.post.update({
        where: { id: request.params.postId },
        data: {
          [key]: value,
        },
      })
      response.status(200).json(post)
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: 'Server Error' })
    }
  }
)

app.delete(
  '/users/:userId/posts/:postId',
  async (request: Request, response: Response) => {
    try {
      const post = await prisma.post.delete({
        where: { id: request.params.postId },
      })
      response.status(200).json(post)
    } catch (error) {
      console.error(error)
      response.status(500).json({ message: 'Server Error' })
    }
  }
)

app.listen(port)
