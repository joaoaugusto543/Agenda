import './NewContact.css'
import { useState } from 'react'
import { contactsServices } from '../../services/contactsServices'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'

function NewContact() {

    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [observations,setObservations]=useState('')
    const [messageError,setMessageError]=useState(null)
    const navigate=useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        const msg=await contactsServices.createContact(name,phone,observations)

        if(msg.indexOf('adicionado')!==-1){
          localStorage.setItem('msg',msg)
          setName('')
          setPhone('')
          setObservations('')
          navigate('/')
        }else{
          setMessageError(msg)
        }
    }

  return (
    <div className="container">
      {messageError && <Message type='err' message={messageError} setMessage={setMessageError}/>}
      <h1 className="main-title">Criar contato</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <input type="hidden" name="type" value="create"/>
        <div className="form-group">
          <label htmlFor="name" className='label'>Nome do contato:</label>
          <input type="text" className="form-control" id="name" name="name" placeholder="Digite o nome" required onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="phone" className='label'>Celular do contato:</label>
          <input type="text" className="form-control" id="phone" name="phone" placeholder="Digite o telefone" required onChange={(e)=>setPhone(e.target.value)}/>
        </div>
        <div className="form-group" >
          <label htmlFor="observations" className='label'>Observações:</label>
          <textarea type="text" className="form-control" id="observations" name="observations" placeholder="Insira as observações" rows="3" onChange={(e)=>setObservations(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>
   </div>
  )
}

export default NewContact