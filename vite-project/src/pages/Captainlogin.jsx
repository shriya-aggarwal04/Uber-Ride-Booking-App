import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { captain , setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()   
  
      const submitHandler = async (e) => {
         e.preventDefault();
         
          const captain ={
          email: email,
          password: password
        }
         
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)

        if(response.status === 200){
          const data = response.data

          setCaptain(data.captain)
          localStorage.setItem('captain-token',data.token)
          navigate('/captain-home')
        }
         
         setEmail('')
         setPassword('')
      }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-20 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }} >
    <h3 className='text-lg font-medium mb-2'> Enter your E-mail </h3>

    <input required
    value={email}
    onChange={ (e) => {
        setEmail(e.target.value)
    }}
    className='bg-[#eeeeee] mb-7 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
     type="email"
    placeholder='email@example.com'
    />

    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
    
    <input required
    value={password}
    onChange={ (e) => {
        setPassword(e.target.value) ;
    }}
    className='bg-[#eeeeee] mb-7 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="password"
     placeholder='password'
      />

    < button className='bg-[#111] text-white font-semibold mb-7 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
        Login
    </button>

   <p className='text-center mb-3'> join a fleet? <Link to= '/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
    
    </form>
    </div>

    <Link
     to='/login'
    className='bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-3
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'>Sign in as User</Link>
</div>
  )
}

export default Captainlogin