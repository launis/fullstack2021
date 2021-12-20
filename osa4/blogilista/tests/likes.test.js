import listHelper from '../utils/list_helper'
import helper from './test_helper'

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

describe('totallikes one blog', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('totalLikes multiple blogs', () => {
    test('Most likes from all of the blogs', () => {
        expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36)
    })
})

describe('favorite blog', () => {
    test('Most favorite blog', () => {
        expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual({
            '__v': 0,
            '_id': '5a422b3a1b54a676234d17f9',
            'author': 'Edsger W. Dijkstra',
            'likes': 12,
            'title': 'Canonical string reduction',
            'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
        })
    })
})

describe('totalLikes of blogger from multiple blogs', () => {
    test('Most likes from all of the blogs', () => {
        expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
            'author': 'Robert C. Martin',
            'blogs': 3})
    })  
})

describe('mostLikes of allBlogs', () => {
    test('Most likes from all of the blogs', () => {
        expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
            'author': 'Edsger W. Dijkstra',
            'likes': 17})
    })
})