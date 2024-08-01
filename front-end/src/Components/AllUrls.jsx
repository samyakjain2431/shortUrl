import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

export default function AllUrls() {
    const navigate = useNavigate();
    const [urls, setUrls] = useState([])

    const changehandle = (shortId) => {
        // Example navigation to '/about' with id parameter
        navigate(`/urls/${shortId}`, {state : {shortId : shortId}});
    };  

    const getAllUrls = async () =>{
        await axios.get('/api/url')
        .then((data)=> {console.log("from func", data.data); setUrls(data.data);})
        .catch((err)=> console.log(err))
    }

    useEffect(() => {
        // console.log(urls)
      getAllUrls()
    }, [] )
    


    return (
        <div className='max-w-[70rem] mx-auto p-10'>
            <Link to={'/'} className='mb-5 inline-block p-3 px-6 bg-slate-300 rounded-lg shadow-md' >&larr; Back to Home</Link>
            <div className="grid grid-cols-3 gap-10 my-5">
            {urls.length === 0 ? (<>No shortURLs</>): urls.map((data, index) =>{
            console.log(data.shortId)
            return(
                <div className=" p-5  w-full   rounded-sm border-2 " key={index} >
                   <p className=''>{data.shortId}</p> 
                   <p className='opacity-75 break-words'>{data.redirectURL}</p>
                    <button className='underline link mt-5 text-blue-500 hover:text-blue-400' onClick={() => changehandle(data.shortId)}>See Analytics</button>
                </div>
            )
        })}
            </div>
        </div>
    );
}

