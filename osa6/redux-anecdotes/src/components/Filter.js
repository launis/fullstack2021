import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <>
      filter <input onChange={handleChange} value={filter.content} />
    </>
  )
}

export default Filter