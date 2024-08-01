import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function UrlAnalytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const shortId = location.state.shortId;
  console.log("shortId : ", shortId);
  const [url, setUrl] = useState({});
  const [deleteMessage, setDeleteMessage] = useState('');
  const [shortIdButtonText, setShortIdButtonText] = useState('Copy');
  const [redirectURLButtonText, setRedirectURLButtonText] = useState('Copy');

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        return Promise.resolve(); // Resolves if successful
      } catch (err) {
        return Promise.reject(err); // Rejects if there is an error
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  const handleCopy = (textToCopy, buttonType) => {
    copyToClipboard(textToCopy)
      .then(() => {
        buttonType==="shortId"?setShortIdButtonText('Copied'):setRedirectURLButtonText("Copied");
        setTimeout(() => {
          buttonType==="shortId"?setShortIdButtonText('Copy'):setRedirectURLButtonText("Copy");
        }, 5000); 
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  const getUrlDetails = async () => {
    try {
      const response = await axios.get(`/api/url/${shortId}`);
      console.log("from Single func\n\n", response);
      setUrl(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUrl = async () => {
    try {
      const response = await axios.delete(`/api/url/${shortId}`);
      console.log(response.data);
      setDeleteMessage(JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/urls');
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUrlDetails();
  }, [shortId]);

  console.log("url", url);

  return (
    <>
      <div className="max-w-[70rem] mx-auto p-10">
        <Link to={'/urls'} className='mb-5 inline-block p-3 px-6 bg-slate-300 rounded-lg shadow-md'>&larr; Back to All URLs</Link>
        {url ? (
          <>
            <div className="grid grid-cols-3 items-center border-2 border-slate-500 my-5">
              <p className='p-3'>ShortURL</p>
              <a href={`http://localhost:8000/${url.shortId}`} target='_blank'>http://localhost:8000/{url.shortId}</a>
              <button className='justify-self-end bg-slate-100 p-3 w-full' onClick={() => handleCopy(url.shortId, "shortId")}>{shortIdButtonText}</button>
            </div>
            <div className="grid grid-cols-3 items-center border-2 my-5">
              <p className='p-3'>Actual URL</p>
              <a href={url.redirectURL} rel=''>{url.redirectURL}</a>
              <button className='justify-self-end bg-slate-100 p-3 w-full' onClick={() => handleCopy(url.redirectURL, "redirect")}>{redirectURLButtonText}</button>
            </div>
            <div className="grid grid-cols-3 items-center border-2 my-5">
              <p className='p-3'>ShortId</p>
              <p>{url.shortId}</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-10 border-2 my-5">
              <p className='p-3'>Created At</p>
              <p>{url.createdAt}</p>
            </div>
            <div className="grid grid-cols-3 items-center gap-10 border-2 my-5">
              <p className='p-3'>Total no of visits</p>
              <p>{url.visitHistory ? url.visitHistory.length : 0}</p>
            </div>
            <div className="grid grid-cols-1 items-center border-2 my-5">
              <p className='p-3'>Visit History</p>
              {url.visitHistory && url.visitHistory.length > 0 ? (
                <ul className="p-3">
                  {url.visitHistory.map((visit, index) => (
                    <li key={index}>
                      {`Visit at ${new Date(visit.timestamp).toLocaleString()}`}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='p-3'>No visits recorded</p>
              )}
            </div>
            <button
              onClick={deleteUrl}
              className='p-3 bg-red-500 text-white px-6 rounded-md'
            >
              Delete
            </button>
            {deleteMessage && <p className="mt-5 text-red-500">{deleteMessage}<br />Redirecting to All URLs in 5 secs...</p>}
          </>
        ) : (
          <p>There's no data from request</p>
        )}
      </div>
    </>
  );
}

export default UrlAnalytics;
