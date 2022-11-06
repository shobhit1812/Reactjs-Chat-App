import React, { useState } from "react"
import "./Join.css"
import { Link } from "react-router-dom"

let user

const sendUser = () => {
  user = document.getElementById("joinInput").value
  document.getElementById("joinInput").value = ""
}

const Join = () => {
  const [name, setName] = useState("")
  console.log(name)
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <h1>Get into it..</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter your name'
          type='text'
          id='joinInput'
        ></input>
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to='/chat'
        >
          <button className='joinBtn' onClick={sendUser}>
            Login In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export { user }
