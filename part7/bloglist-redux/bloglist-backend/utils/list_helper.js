const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return (blogs.map((blog) => blog.likes)).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((a, b) => (a.likes > b.likes ? a : b))

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = blogs => {
  const filteredArr = blogs.reduce((acc, current) => {
    const x = acc.find(item => {
      return item.author === current.author
    })

    if (!x) {
      return acc.concat({ author: current.author, blogs: 1 })
    }

    x.blogs += 1
    return acc
  }, [])

  return filteredArr.reduce((a, b) => (a.blogs > b.blogs ? a : b))
}

const mostLikes = blogs => {
  const filteredArr = blogs.reduce((acc, current) => {
    const x = acc.find(item => item.author === current.author)

    if (!x) {
      return acc.concat({ author: current.author, likes: current.likes })
    }

    x.likes += current.likes
    return acc
  }, [])

  return favoriteBlog(filteredArr)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
