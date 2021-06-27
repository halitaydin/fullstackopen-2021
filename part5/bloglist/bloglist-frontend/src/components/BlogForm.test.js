import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'ReactJs' }
  })

  fireEvent.change(author, {
    target: { value: 'Dan Abramov' }
  })

  fireEvent.change(url, {
    target: { value: 'www.reactjs.org' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('ReactJs')
  expect(createBlog.mock.calls[0][0].author).toBe('Dan Abramov')
  expect(createBlog.mock.calls[0][0].url).toBe('www.reactjs.org')
})
