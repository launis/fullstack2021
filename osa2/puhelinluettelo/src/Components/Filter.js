import React from 'react'


const Filter = ({ onChange, newSearch })  =>  {
  return (
    <div>
      Starts with <input onChange={onChange} value={newSearch}></input>
    </div>
  )
}


export default Filter