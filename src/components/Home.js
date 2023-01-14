import React,{useState,useEffect} from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';
import PostList from './PostList';


function Home() {

  useEffect(() => {
      viewPost();
  }, []);

  const [ispost, setpost] = useState([]);
  const viewPost = async() =>{
    try {
      await axios.get(`http://localhost:5000/users`,)
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
      <div className="row">
        <h1> Email Template <span> wysiwyg </span> Editor </h1><br />
        <img className='sticker' src="/animation.png" alt="animation"/>
        <Link to="/Add" className="btn btn__theme btn__add"> Create New </Link>

        {ispost.map((item,index) => ( 
          <div className="post__list" key={index}>
            <h2>{item.title}</h2>

            <div className="post__description" dangerouslySetInnerHTML={{ __html: item.description}}  />
            <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>

          </div>
        ))}

        <PostList />
        
      </div>
    </div>
  </div>
  );
}

export default Home;
