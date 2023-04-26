import { api } from "../config/api";

async function createContact(name,phone,observations){
    try {

        const response=await api.post('/newContact.php',{name,phone,observations})
        if(!response.data.msg){
            throw response.data
        }
        return response.data.msg

    } catch (error) {
        console.log(error)
        if(typeof(error)==='string'){
            if(error.indexOf('SQLSTATE[23000]')!==-1){
                return 'Contato já existe'
            }
        }else{
            return error.response.data.msg
        }

    }
}

async function getContacts(){
    try {
        const response=await api.get('/')
        return response.data.contacts    
    } catch (error) {
        console.log('internal error')
    }
}

async function getContact(id){
    try {

        const response=await api.post('/getUserById.php',{id})
        return response.data.contacts    
    } catch (error) {
        console.log('internal error')
    }
}

async function deleteContact(id){
    try {
        const response=await api.post('/deleteContact.php',{id})  
        return response.data.msg
    } catch (error) {
        console.log('internal error')
    }
}

async function updateUser(updatedContact){

    const {id,name,phone,observations}=updatedContact

    try {
        const response=await api.post('/updateUser.php',{id,name,phone,observations})

        if(!response.data.msg){
            throw response.data
        }

        return response.data.msg 
    } catch (error) {
        if(typeof(error)==='string'){
            if(error.indexOf('SQLSTATE[23000]')!==-1){
                return 'Contato já existe'
            }
        }else{
            return error.response.data.msg
        }
    }
}

export const contactsServices={
    createContact,
    getContacts,
    deleteContact,
    getContact,
    updateUser
} 