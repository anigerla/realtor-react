import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

export default function Header() {
  const [pageState, setPageState] = useState("Sign In")
  const location = useLocation()
  const navigate = useNavigate()
  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState("Profile")
      }else{
        setPageState("Sign In")
      }
    })
  })
  function pathMatchRoute(route) {
    if(route === location.pathname) {
      return true
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BoNgYCU0sSObXA4npMohm5_FMvk6DDW9byH87EAMN2no7N2f0uRt3LO5apuxH4tTKw&usqp=CAU' alt="" className="h-4 cursor-pointer" onClick={()=> navigate("/")}/>
        <div>
          <ul className='flex space-x-10'>
            <li 
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && 
                "text-black border-b-red-500"}`} 
              onClick={()=>navigate("/")}>
                Home
            </li>
            <li 
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && 
                "text-black border-b-red-500"}`} 
              onClick={()=>navigate("/offers")}>
                Offers
            </li>
            <li 
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-600 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && 
                "text-black border-b-red-500"}`} 
              onClick={()=>navigate("/profile")}>
                {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}
