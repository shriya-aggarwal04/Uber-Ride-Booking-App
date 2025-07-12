import React,{useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const userSignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [userData,setUserData] = useState({});
  const navigate = useNavigate();
  const {user,setUser } = useContext(UserDataContext)

  const submitHandler = async(e)=>{
    e.preventDefault()
    const  newUser = {
      fullname:{
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser) 

    if(response.status===201){
      const data = response.data
     setUser(data.user)
      localStorage.setItem('token',data.token);
      
    }
    

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    navigate('/start')
    
  }
  return (
    <div>

    
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
    <form onSubmit={(e)=>{
      submitHandler(e)
    }}>

      {/* name block */}

    <h3 className='text-lg font-medium mb-2'> Enter your Name </h3>
    <div className=' flex gap-4 mb-6'>
    <input required
    className='bg-[#eeeeee] 
     rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
     type="text"
    placeholder='First Name'
    value={firstname}
    onChange={(e) => {
      setFirstname(e.target.value)
    }}

    
  />

    <input required
    className='bg-[#eeeeee] 
     rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
     type="text"
    placeholder='Last Name'
    value={lastname}
    onChange={(e) => {
      setLastname(e.target.value)
    }}
    />
    </div>
    
      {/* email block */}

    <h3 className='text-lg font-medium mb-2'> Enter your E-mail </h3>
    <input required
    className='bg-[#eeeeee] mb-6 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
     type="email"
    placeholder='email@example.com'
    value={email}
    onChange={(e) => {
      setEmail(e.target.value)
    }}
    />

  {/* password block */}

    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
    <input required
    className='bg-[#eeeeee] mb-6
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="password"
    placeholder='password'
    value={password}
    onChange={(e) => {
      setPassword(e.target.value)
    }}
    />

  {/* login button */}

   < button className='bg-[#111] text-white font-semibold mb-7 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
        Sign Up
    </button>
    </form>
  <p className='text-center mb-3'> Already have an Account? <Link to= '/login' className='text-blue-600'>Login here</Link></p>
    </div>
  <div>
    <p className='text-[10px] leading-tight'>
    This site is protected by reCAPTCHA and the <span className='undeline'>Google privacy Policy</span>
    and <span className='underline'>Terms of Service apply</span>.</p>
    </div>
    </div>
    </div>
    
  )
}

export default userSignUp