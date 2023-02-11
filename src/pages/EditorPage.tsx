import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ACTIONS } from '../action'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import toast from 'react-hot-toast';
const EditorPage = () => {
  const [clients, setClients] = useState([])

  console.log('client', clients)
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const location = useLocation()
  const socketRef = useRef(null) as any

  useEffect(() => {
    // console.log(location.state?.userName)

    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err: any) => handleErrors(err));
      socketRef.current.on('connect_failed', (err: any) => handleErrors(err));

      socketRef.current = await initSocket()
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.userName
      });



      socketRef.current.on(ACTIONS.JOINED, ({ client, username, socketId }: any) => {
        if (username !== location.state?.userName) {
          toast.success(`${username} joined the room`, { id: "joined" })

        }

        setClients(client)
      })



      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }: { socketId: any, username: any }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter(
              (c) => {
                console.log(c.id, ':', socketId)
                console.log(c)
                return c.id !== socketId
              }
            );
          });

          console.log(clients)
        }
      );



      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      };
    }

    function handleErrors(e: any) {

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