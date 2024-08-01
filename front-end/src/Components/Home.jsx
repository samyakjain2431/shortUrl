import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Home() {

	const navigate = useNavigate()
  	const [recievedUrl, setRecievedUrl] = useState('');
    const [message, setMessage] = useState('');
	const [urlData, setUrlData] = useState([])

	const handleGetURLData = async() =>{
		await axios.get("/api/url")
		.then((data)=>{
			console.log(data.data)
			setUrlData(data.data)
		})
		.catch((err)=>console.log(err))
	}
	const changehandle = (shortId) => {
        // Example navigation to '/about' with id parameter
        navigate(`/urls/${shortId}`, {state : {shortId : shortId}});
    };  

    const handleSubmit = async (event) => {
		event.preventDefault()
        await axios.post("/api/url", {url : recievedUrl})
		.then((data)=>{
			console.log(data.data);
			setMessage(JSON.stringify(data.data))
			setTimeout(() => {
				navigate(`/urls/${data.data.shortId}`, {state : {shortId : data.data.shortId}});
			  }, 5000);
			
		})
		.catch((err)=>{
			console.log(err);
			setMessage(JSON.stringify(err))
			
		})
    };

	useEffect(() => {
	  handleGetURLData()
	}, [])
	

    return (
		// <div className="mx-auto">
        <div className='flex justify-center flex-col  max-w-[70rem] mx-auto p-10'>
			<div className="flex justify-center items-center flex-col  my-20">
            <h1 className='text-[50px] font-bold'>Free URL Shortener</h1>
            <form onSubmit={handleSubmit} className='flex text-[16px] my-5 gap-5'>
                    <input
                        type="url"
						className='p-3 border-2 w-96 border-slate-500 rounded-md'
						placeholder='Enter your link or URL here'
                        id="url"
                        value={recievedUrl}
                        onChange={(e) => setRecievedUrl(e.target.value)}
                        required
                    />
                <button type="submit" className='p-3 border-2 border-blue-500 rounded-md text-white bg-blue-500 hover:bg-blue-600 duration-200'>Generate Short URL</button>
            </form>
			<p className='text-slate-800 max-w-[60rem] '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi fuga corporis id aliquid sit fugit, itaque exercitationem voluptates expedita libero laboriosam voluptate ad modi ratione suscipit impedit, quos quod ex enim harum accusamus! Quod laboriosam non fugiat ipsum incidunt nesciunt quisquam dolorum? Aliquam fugiat aut nulla enim id quidem vero.</p>
			
            { message && <code className='bg-slate-600 p-5 text-slate-200 mt-3'>{message}<br/>Redirecting to {message.shortId} page in 5 seconds...</code>}
			</div>
			<hr className='h-[2px] bg-slate-500  w-3/4 mx-auto ' />
			<div className="recentSlides my-10">
				<h2 className='text-[22px] font-semibold mb-5'>Recent ShortURLs</h2>
				<div className="grid grid-cols-3 gap-10">
					{urlData.length === 0 ? (<>No ShortURLs</>): 
					urlData.slice(0,3).map((item, index) =>{
						return(

							<div className=" p-5  w-full   rounded-sm border-2 " key={index}  >
							<p className=''>{item.shortId}</p> 
							<p className='opacity-75 break-words'>{item.redirectURL}</p>
							<button onClick={() => changehandle(item.shortId)} className='underline link mt-5 text-blue-500 hover:text-blue-400'>See Analytics</button>
					 	</div>
						)
					})
					}
					
				</div>
			</div>
        </div>
		// </div>
  )
}

export default Home
