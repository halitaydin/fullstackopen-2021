const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const body = (request.body)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog)
    return response.status(204).end()

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  return response.status(401).json({ error: 'cannot remove blogs that belong to someone else' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const blog = {
    likes
  }

  console.log(blog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const requestBlog = await Blog.findById(request.params.id)
  requestBlog.comments = requestBlog.comments.concat(request.body.comment)
  requestBlog.save()
  response.status(requestBlog ? 200 : 404).json(requestBlog)
})

module.exports = blogsRouter
