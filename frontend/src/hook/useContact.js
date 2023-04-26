import { useEffect, useState } from "react"
import { contactsServices } from "../services/contactsServices"

export default function useContact(id){
    const [contact,setContact]=useState(null)

    useEffect(()=>{
        loadData(id)
    },[id])

    async function loadData(id){
        const res=await contactsServices.getContact(id)
        setContact(res)
    }

    return {contact}
}