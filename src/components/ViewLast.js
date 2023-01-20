import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Download from './Download';


const ViewLast = () => {

  const [users, setUser] = useState([]);
  console.log(users)
  const [isPost, setPost] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    setUser(response.data);
    setPost(response.data.slice(-1));
    console.log(response.data)
    
  };
  
  return (
   
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/Add`} className="button is-danger is-light">
          Add New
        </Link>
        <br /><br />

        <Card>
        {isPost.map((item,index) => ( 
                    <div className="post__list" key={index}>
                        <h2>Title: {item.title}</h2>

                        <div className="post__description" dangerouslySetInnerHTML={{ __html:JSON.parse(item.description)}}  />
                        <br /><br />
                        
                        <div className='footer-editor'>   
                        <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>
                        <Button icon="pi pi-download" className="p-button-rounded p-button-secondary"  onClick={() => Download(item.id,item.description)} aria-label="Bookmark" />

                        </div>
                    </div>
                    ))}
        </Card>
      </div>
    </div>
   
  );
};

export default ViewLast;
