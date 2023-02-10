import React, { useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'


const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Chetan baliyan' },
    { socketId: 2, username: 'Sagar singh' },
  ])
  return (
    <div className="mainWrap h-screen ">
      <div className="aside  h-[100%] " >
        <div className='flex flex-col items-center justify-center h-full'>

          <div className="asideInner    ">
            <div className="logo">
              Code sync
            </div>
            <h3 className='mb-4'>Connected</h3>
            <div className="clientsList ">
              {clients.map((client) => (
                <Client
                  key={client.socketId}
                  username={client.username}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="btn copyBtn">
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" >
          Leave
        </button>
      </div>
      <div className="editorWrap ">
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage