import './Contact.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { contactsServices } from '../../services/contactsServices'
import useContact from '../../hook/useContact'

function Contact() {

    const {id}=useParams()
    const {contact}=useContact(id)

  return (
    <>
        { contact &&
            <div className="container" id="view-contact-container"> 
                <h1 className="main-title">{contact.name}</h1>
                <p className="bold">Telefone:</p>
                <p>{contact.phone}</p>
                <p className="bold">Observações:</p>
                <p>{contact.observations}</p>
            </div>

        }
    </>
  )
}

export default Contact