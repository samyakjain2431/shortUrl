import React from "react";
import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from "./Components/Home";
import AllUrls from "./Components/AllUrls";
import UrlAnalytics from "./Components/UrlAnalytics";
import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
import About from "./Components/About";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>

      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/urls" element={<AllUrls/>} />
      <Route path="/urls/:id" element={<UrlAnalytics/>} />
      
    </Route>
  )
)


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    {/* <Footer/> */}
    </>
  );
}

export default App;
