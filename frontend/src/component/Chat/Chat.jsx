import React, { useEffect, useState } from "react"
import { user } from "../Join/Join" // eslint-disable-next-line
import socketIo from "socket.io-client"
import "./Chat.css"
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom"

let socket

const ENDPOINT = "https://backend-chat-app.onrender.com/"
// const ENDPOINT = "http://localhost:4500/"

const Chat = () => {
  const [id, setId] = useState("")
  const [messages, setMessages] = useState([])
  const send = () => {
    const message = document.getElementById("chatInput").value
    socket.emit("message", { message, id })
    document.getElementById("chatInput").value = ""
  }
  console.log(messages)
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] })
    socket.on("connect", () => {
      alert("Connected")
      setId(socket.id)
    })
    console.log(socket)
    socket.emit("joined", { user })
    socket.on("welcome", (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })
    socket.on("userJoined", (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })
    socket.on("leave", (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message)
    })
    return () => {
      socket.emit("disconnect")
      socket.off()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data])
      console.log(data.user, data.message, data.id)
    })
    return () => {}
  }, [messages])

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'>
          <h2>संवाद | Sanvaad</h2>
        </div>
        <ReactScrollToBottom className='chatBox'>
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            ></Message>
          ))}
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type='text'
            id='chatInput'
          ></input>
          <button onClick={send} className='sendBtn'>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
