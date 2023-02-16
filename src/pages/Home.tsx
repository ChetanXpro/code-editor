import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
const Home = () => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()
  const createNewRoom = (e: any) => {
    e.preventDefault()
    const id = uuidv4()
    toast.success('Created New room')
    setRoomId(id)

  }
  const joinRoom = () => {
    if (!roomId || !userName) {
      toast.error('Please fill all details')
      return
    }
    console.log(roomId)

    navigate(`editor/${roomId}`, { state: { userName } })

  }

  const handleEnter = (e: any) => {

    if (e.code === 'Enter') {
      joinRoom()
    }

  }
  return (
    <div className="homePageWrapper bg-red-500">
      <div className="formWrapper">
        <h1 className='mb-6'></h1>
        <h4 className="mainLabel flex items-center justify-center text-lg">Coding Rooms</h4>
        <div className="inputGroup h-60">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="inputBox"
            placeholder="ROOM ID"
            onKeyUp={handleEnter}

          />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="inputBox"
            onKeyUp={handleEnter}
            placeholder="USERNAME"

          />
          <button onClick={joinRoom} className="btn bg-blue-500 w-full joinBtn" >
            Join
          </button>
          <span className="createInfo">
           don't have an invite ? then create &nbsp;
            <a
              onClick={createNewRoom}
              href=""
              className="createNewBtn  underline text-blue-500"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default Home