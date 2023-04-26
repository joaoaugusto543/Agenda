import React, { useEffect, useState } from 'react'
import useContact from '../../hook/useContact'
import { useNavigate, useParams } from 'react-router-dom'
import { contactsServices } from '../../services/contactsServices'
import Message from '../../components/Message/Message'

function EditContact() {

    const {id}=useParams()

    const {contact}=useContact(id)

    useEffect(()=>{
      if(contact){
        setName(contact.name)
        setPhone(contact.phone)
        setObservations(contact.observations)
      }
    },[contact])

    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [observations,setObservations]=useState('')
    const [messageError,setMessageError]=useState(null)
    const navigate=useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        const updatedContact={
          id,
          name,
          phone,
          observations
        }

        const res=await contactsServices.updateUser(updatedContact)

        if(res.indexOf('atualizado') !==-1){
          localStorage.setItem('msgUpdate',res)
          navigate('/')
        }else{
          setMessageError(res)
        }
        
    }

  return (
    <>
        {contact &&
            <div className="container">
            {messageError && <Message type='err' message={messageError} setMessage={setMessageError}/>}
            <h1 className="main-title">Editar contato</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <input type="hidden" name="type" value="create"/>
                <div className="form-group">
                  <label htmlFor="name" className='label'>Nome do contato:</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Digite o nome" value={name} required onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className='label'>Celular do contato:</label>
                  <input type="text" className="form-control" id="phone" name="phone" placeholder="Digite o telefone" value={phone} required onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div className="form-group" >
                  <label htmlFor="observations" className='label'>Observações:</label>
                  <textarea type="text" className="form-control" id="observations" name="observations" placeholder="Insira as observações" value={observations} rows="3" onChange={(e)=>setObservations(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>

        }
    </>
  )
}

export default EditContact