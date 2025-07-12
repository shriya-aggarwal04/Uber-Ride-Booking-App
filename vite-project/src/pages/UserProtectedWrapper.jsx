import React, { useState }  from 'react'
import { useContext,useEffect } from 'react'
import {UserDataContext} from '../context/UserContext'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({
    children 
}) => {
const token = localStorage.getItem('token') //token value-> null
const navigate = useNavigate()
const { user, setUser } = useContext(UserDataContext)
const [ isLoading, setIsLoading ] = useState(true)

   useEffect(()=>{
    if(!token){
        navigate('/login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if(response.status === 200){
        setUser(response.data)
        setIsLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      navigate('/login')
    })
   },[token])

   if(isLoading) {
    return (
      <div>Loading...</div>
    )
   }
   
  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtectedWrapper