import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let mockHandler = jest.fn()
  let deleteHandler = jest.fn()
  const blog = {
    title: 'ReactJs',
    author: 'Dan Abramov',
    url: 'www.reactjs.org',
    likes: 1,
    user : {
      username: 'Halit Aydin',
    },
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={blog.user.username}
        key={blog.id}
        updateBlog={mockHandler}
        deleteBlog={deleteHandler}
      />
    )
  })

  test('renders its title', () => {
    const div = component.container.querySelector('.blogTitle')

    expect(div.textContent).toBe('ReactJs')
  })

  test('renders its author', () => {
    const div = component.container.querySelector('.blogAuthor')

    expect(div).toHaveTextContent('Dan Abramov')
  })

  test('click shows more: url', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.url')

    expect(div.textContent).toBe(
      'www.reactjs.org'
    )
  })

  test('click shows more: likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.likes')

    expect(div.textContent).toBe(
      '1'
    )
  })

  test('click twice', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.getByText('like')
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(1)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('remove', () => {
    window.confirm = jest.fn().mockImplementation(() => true)
    const view = component.getByText('view')
    fireEvent.click(view)

    const remove = component.getByText('remove')
    fireEvent.click(remove)
    expect(deleteHandler.mock.calls).toHaveLength(1)
  })


  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.blogUrlLikes')

    expect(div).toEqual(null)
  })

  test('hide', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const hide = component.getByText('hide')
    fireEvent.click(hide)

    const div = component.container.querySelector('.blogUrlLikes')

    expect(div).toEqual(null)
  })
})
