import React from 'react'
import Notfound from "../../public/404.gif"
const NotFound = () => {
  return (
    <div className=' bg-black h-screen w-full flex items-center justify-center' >
    <img  className='h-3/5 ' src={Notfound} alt="" />
  </div>
  )
}

export default NotFound