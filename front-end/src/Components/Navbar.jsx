import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'

function Navbar() {
  return (
    <div className=''>
      <div className="flex justify-between items-center p-3 ">
        
        <Link to={'/'} className='font-semibold text-xl'>ShortURL</Link>
        <div className='flex gap-8'>
           
        <Link to={'/urls'}>All URLs</Link>
        <a href="http://github.com/samyakjain2431" className='' target="_blank" rel="noopener noreferrer">Github</a>
        </div>
      </div>
        <main className='min-h-[90vh]'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Navbar