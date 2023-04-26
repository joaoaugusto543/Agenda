import './Home.css'
import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { contactsServices } from "../../services/contactsServices"
import Message from '../../components/Message/Message'

function Home() {

  const [contacts,setContacts]=useState([])
  const [message,setMessage]=useState(null)
  const [messageUpdate,setMessageUpdate]=useState(null)
  const [messageDelete,setMessageDelete]=useState(null)

  useEffect(()=>{
    if(localStorage.getItem('msg')){
      setMessage(localStorage.getItem('msg'))
    }
    if(localStorage.getItem('msgUpdate')){
      setMessageUpdate(localStorage.getItem('msgUpdate'))
    }

    loadData()
  },[])

  async function loadData(){
    const data=await contactsServices.getContacts()
    setContacts(data)
  }

  async function handleDeleteContact(id){
    const response=await contactsServices.deleteContact(id)
    setMessageDelete(response)
    setContacts(contacts.filter(contact=>contact.id!==id))
  }

  return (
    <div className="container">
    {message && <Message type='sucess' message={message} setMessage={setMessage}/>}
    {messageUpdate && <Message type='sucess' message={messageUpdate} setMessage={setMessageUpdate}/>}
    {messageDelete && <Message type='sucess' message={messageDelete} setMessage={setMessageDelete}/>}
    <h1 id="main-title">Minha Agenda</h1>
    {contacts.length > 0 ?(
        <table className="table" id="contacts-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Celular</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact,index)=>(
              <tr key={index}>
                <td className="col-id">{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td className="actions">
                  <Link to={`/contact/${contact.id}`}><i className="fas fa-eye check-icon"></i></Link>
                  <Link to={`/editContact/${contact.id}`}><i className="far fa-edit edit-icon"></i></Link>
                  <button className="delete-btn" onClick={()=>handleDeleteContact(contact.id)}><i className="fas fa-times delete-icon"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    ):(<>
      <p id="empty-list-text">Ainda não há contatos na sua agenda, <Link to='/NewContact'>clique aqui para adicionar</Link>.</p>
    </>)
    }

  </div>
  )
}

export default Home