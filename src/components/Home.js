import React,{useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import PostList from './PostList';
import { Button } from 'primereact/button';
import "primeflex/primeflex.css";
import AppTopbar from '../AppTopbar';


function Home() {

  useEffect(() => {
      viewPost();
  }, []);

  const [ispost, setpost] = useState([]);
  const viewPost = async() =>{
    try {
      await axios.get(`http://localhost:5000/posts`,)
      .then(res => { 
        if(res.data.success === true){
          setpost(res.data);
        }
      })
    } catch (error) { throw error;}
  }
 
  return (
  <div className="App">
    <div className="container">

    <div className="grid grid-nogutter surface-0 text-800">
    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span className="block text-6xl font-bold mb-1">Create the screens</span>
            <div className="text-6xl font-bold mb-3" style={{color:'#f14668'}}>your visitors deserve to see</div>
            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            
            <Link to="/Add"><Button className="mr-3 p-button-raised"> Create New </Button></Link>
            <Link to="/PostList" type="button"><Button  className="p-button-outlined">Post List</Button></Link>
        </section>
    </div>
    <div className="col-12 md:col-6 overflow-hidden">
      <br /><br />
        <img src="/animation.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
    </div>
</div>
    </div>
  </div>
  );
}

export default Home;


    