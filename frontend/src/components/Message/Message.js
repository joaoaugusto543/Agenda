import './Message.css'
import { useEffect} from 'react'

function Message({message,setMessage,type}) {

  useEffect(()=>{

    setTimeout(()=>{
        setMessage(null)
        if(localStorage.getItem('msg')){
          localStorage.removeItem('msg')
        }
        if(localStorage.getItem('msgUpdate')){
          localStorage.removeItem('msgUpdate')
        }
    },2000)
    
  },[setMessage])  

  return (
    <p className={`message ${type}`}>{message}</p>
  )
}

export default Message