import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ( { id } ) => {
  const dispatch = useDispatch()

  const [comment, newComment] = useState('')

  const HandleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment ( id, comment ))
    newComment('')}

  return (
    <form onSubmit={HandleAddComment}>
            comment
      <input
        type="text"
        value={comment}
        name='Comment'
        id="Comment"
        onChange={({ target }) => newComment(target.value)}
      />
      <button id='Save' type="submit">save</button>
    </form>
  )
}
export default CommentForm