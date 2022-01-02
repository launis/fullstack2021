const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, b) => total + b.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostBlogs = (blogs) => {
  const Authors = blogs.reduce((blogCount, blog) => {
    blogCount[blog.author] = (blogCount[blog.author] || 0) + 1
    return blogCount
  }, {})

  const mostBlogs = Math.max(...Object.values(Authors))

  const biggestBlogger = Object.keys(Authors)
    .filter(author => Authors[author] === mostBlogs)

  return {
    author: biggestBlogger[0],
    blogs:  mostBlogs
  }
}

const mostLikes = (blogs) => {
  const Authors = blogs.reduce((likeCount, blog) => {
    likeCount[blog.author] = (likeCount[blog.author] || 0) + blog.likes
    return likeCount
  }, {})

  const mostLikes = Math.max(...Object.values(Authors))
  const mostLikedBlogger = Object.keys(Authors)
    .filter(author => Authors[author] === mostLikes)
  return {
    author: mostLikedBlogger[0],
    likes: mostLikes
  }

}


export default {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
