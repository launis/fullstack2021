import listHelper from '../utils/list_helper'
import helper from './test_helper'

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

describe('totallikes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('totalLikes multiple blogs calculated right', () => {
    expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('Most favorite blog', () => {
    expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 12,
      'title': 'Canonical string reduction',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    })
  })
})

describe('Most likes abd bloggers from multiple blogs', () => {
  test('Most blogs', () => {
    expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
      'author': 'Robert C. Martin',
      'blogs': 3 })
  })  

  test('Most likes', () => {
    expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
      'author': 'Edsger W. Dijkstra',
      'likes': 17 })
  })
})