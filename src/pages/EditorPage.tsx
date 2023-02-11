import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ACTIONS } from '../action'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import toast from 'react-hot-toast';
const EditorPage = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Chetan baliyan' },
    { socketId: 2, username: 'Sagar singh' },
  ])
  const { roomId } = useParams();
    const reactNavigator = useNavigate();
  const location = useLocation()
  const socketRef = useRef(null) as any

  useEffect(() => {

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err: any) => handleErrors(err));
      socketRef.current.on('connect_failed', (err: any) => handleErrors(err));

      socketRef.current = await initSocket()
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
      });
    }

    function handleErrors(e) {
      console.log('socket error', e);
      toast.error('Socket connection failed, try again later.');
      reactNavigator('/');
  }
    init()

  }, [])

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