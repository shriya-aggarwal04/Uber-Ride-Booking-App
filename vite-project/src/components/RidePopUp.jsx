import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
    <h5 className='p-1 text-center w-[93%] absolute top-0 ' onClick={()=>{
        props.setRidePopupPanel(false)
  }}><i className=" text-3xl text-gray-400 ri-arrow-down-wide-fill"></i></h5>
   <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

   <div className='flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-10  rounded-full object-cover w-10' src="https://img.freepik.com/free-psd/close-up-kid-expression-portrait_23-2150193262.jpg" alt="" /> 
          <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " +props.ride?.user.fullname.lastname}</h2> 
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM </h5>
   </div>

  <div className='flex gap-2 justify-bertween flex-col items-center'>
  
  <div className='w-full mt-5'>
    <div className='flex  items-center gap-5 p-3 border-b-2'>
    <i className="text-lg ri-map-pin-user-fill"></i>
    <div >
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
    </div>
    </div>
    <div className='flex  items-center gap-5 p-3 border-b-2'>
    <i className=" text-lg ri-map-pin-fill"></i>
    <div>
        <h3 className='text-lg font-medium'>562/11-A</h3>
        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
    </div>
    </div>
    <div className='flex  items-center gap-5 p-3 '>
    <i className=" text-lg ri-currency-line"></i>
    <div>
        <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
    </div>
    </div>

  </div>
    <div className=' w-full items-center justify-between'>
    <button onClick={()=>{
    props.setConfirmRidePopupPanel(true)
    props.confirmRide()
    
  }} className='w-full mt-5 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>

<button onClick={()=>{
   props.setRidePopupPanel(false)
  }} className='w-full mt-2 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore</button>

  
    </div>
  </div>
</div>
  )
}

export default RidePopUp