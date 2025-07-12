import React , {useState,useRef, useContext, useEffect} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitForDriver from '../components/WaitForDriver'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
// import { set } from 'mongoose'

 



const Start = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const waitingForDriverRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeFeild, setActiveFeild] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const { socket } = useContext(SocketContext)
  const { user} = useContext(UserDataContext)

  console.log(user);

  useEffect(() =>{
    console.log(user);
    socket.emit('join', { userType: 'user', userId:user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {

    setVehicleFound(false)

    setWaitingForDriver(true)
  })

  

  const navigate = useNavigate()

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    }catch{
      // handle error
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    }catch{
      // handle error
    }
  }

  const submitHandler = (e)=>{
    e.preventDefault()
 }

  
 useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding: 24
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:0
        // opacity:0
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
 },[panelOpen])


 useGSAP(function (){
  if(vehiclePanelOpen){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
  }else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
  }
  
 },[vehiclePanelOpen])


 useGSAP(function (){
  if(confirmRidePanel){
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    })
  }else{
    gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    })
  }
  
 },[confirmRidePanel])

 useGSAP(function (){
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    })
  }else{
    gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
    })
  }
  
 },[vehicleFound])

 useGSAP(function (){
  if(waitingForDriver){
    gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
    })
  }else{
    gsap.to(waitingForDriverRef.current,{
      transform:'translateY(100%)'
    })
  }
  
 },[waitingForDriver])

 async function findTrip() {
  setVehiclePanelOpen(true)
  setPanelOpen(false)

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
     setFare(response.data)
}

 async function createRide(){
  console.log("pickup:", pickup);
   console.log("destination:", destination);
  console.log("vehicleType:", vehicleType);

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
    pickup,
    destination,
    vehicleType
  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  console.log(response.data);
 }


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className=' w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div onClick={()=>{
        setVehiclePanelOpen(false)
      }} className='h-screen w-screen'>
          {/* image for temporary use */}
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>

          <div className='h-[30%] p-6 bg-white relative'>

            <h5 ref={panelCloseRef} onClick={()=>{
              setPanelOpen(false)
            }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
            </h5>
          
            <h4 className='text-2xl font-semibold'>Find a Trip</h4>
        <form className='relative py-3' onSubmit={(e)=>{
               submitHandler(e)
            }}>

         <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full"></div>
            <input
            onClick={()=>{
                setPanelOpen(true)
                setActiveFeild('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
               className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
               type="text"
              placeholder='Add a pick-up location'
           />
            <input 
             onClick={()=>{
               setPanelOpen(true)
               setActiveFeild('destination')
             }}
                value={destination}
                onChange={handleDestinationChange}
                 className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                  type="text"
                 placeholder='Enter your destination' />
       </form>
       <button
          onClick={findTrip}
           className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
           Find Trip
        </button>
       
        </div>

        <div ref={panelRef} className='bg-white h-0'>
                <LocationSearchPanel
                suggestions={activeFeild ==='pickup' ? pickupSuggestions : destinationSuggestions}
                  setPanelOpen={setPanelOpen}  
                  setVehiclePanelOpen={setVehiclePanelOpen} 
                  setPickup={setPickup} 
                  setDestination={setDestination}
                  activeFeild={activeFeild}
                  />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-12 bg-white'>
              <VehiclePanel 
              selectVehicle={setVehicleType}
              fare={fare}
               setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
              <ConfirmRide
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
              setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
              <LookingForDriver
              createRide={createRide}
              pickup={pickup}
              destination={destination}
              fare={fare}
              vehicleType={vehicleType}
               setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  px-3 py-6 pt-12 bg-white'>
              <WaitForDriver 
              ride={ride}
              setVehicleFound={setVehicleFound}
              setWaitingForDriver={setWaitingForDriver}
              waitingForDriver={waitingForDriver} />
      </div>
  </div>
  )
}

export default Start
