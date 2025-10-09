import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    //const [captainData, setCaptainData] = useState({})

    const [vehicleColor,setVehicleColor] = useState('')
    const [vehiclePlate,setVehiclePlate] = useState('')
    const [vehicleCapacity,setVehicleCapacity] = useState('')
    const [vehicleType,setVehicleType] = useState('')
    const {captain,setCaptain} = React.useContext(CaptainDataContext)
  
    const submitHandler = async (e)=>{
      e.preventDefault()

      const captainData ={
        fullname:{
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password,
        vehicle:{
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }

         }
         //req ->res
         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
         //console.log(response);
         if(response.status === 201){
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem('captain-token',data.token)
          navigate('/captain-home')
         }
      
      setFirstname('')
      setLastname('')
      setEmail('')
      setPassword('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
      setVehicleType('')
    } 
  return (
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

    {/* vehicle information */}
    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
    <div className='flex gap-4 mb-7'>

    <input required
    className='bg-[#eeeeee] mb-6
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="text"
    placeholder='Vehicle Color'
    value={vehicleColor}
    onChange={(e) => {
      setVehicleColor(e.target.value)
    }}
    />

    <input required
    className='bg-[#eeeeee] mb-6
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="text"
    placeholder='Vehicle Plate '
    value={vehiclePlate}
    onChange={(e) => {
      setVehiclePlate(e.target.value)
    }}
    />
    </div>

    <div className='flex gap-4 mb-7'>
    <input required
    className='bg-[#eeeeee] mb-6
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="number"
    placeholder='Vehicle Capacity '
    value={vehicleCapacity}
    onChange={(e) => {
      setVehicleCapacity(e.target.value)
    }}
    />
    <select required
    className='bg-[#eeeeee] mb-6
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    type="text"
    value={vehicleType}
    onChange={(e) => {
      setVehicleType(e.target.value)
    }}
    >
      <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
      </select>


    </div>

  {/* sign up button */}

   < button className='bg-[#111] text-white font-semibold mb-7 
     rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
        Sign Up
    </button>

   <p className='text-center mb-3'> Already have an Account? <Link to= '/captain-login' className='text-blue-600'>Login here</Link></p>
    
    </form>
  </div>
  <div>
    <p className='text-[10px] leading-tight mb-3'>
      This site is protected by reCAPTCHA and the <span className='underline'>Google privacy Policy</span>
      and <span className='underline'>Terms of Service apply</span>.
    </p>
  </div>
 </div>
  )
}

export default CaptainSignup