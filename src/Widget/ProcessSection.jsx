import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProcessSection() {
    const navigate = useNavigate()
    const handleProces = () =>{
        navigate('/process')
    }
    const handleTicket = () =>{
        navigate('/ticket')
    }
  return (
    <div className="mt-8 max-w-2xl mx-auto flex justify-between space-x-4">
        <button className='h-20 w-40 flex flex-shrink bg-pink-600 ' onClick={handleProces}>
            <span>Risk level </span>
        </button>
        <button className='h-20 w-40 flex flex-shrink bg-cyan-600 ' onClick={handleTicket}>
            <span>Get The Ticket</span>
        </button>
    </div>
  )
}

export default ProcessSection