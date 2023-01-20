import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import Download from './Download';



const View = () => {

  useEffect(() => {
    getUserById();
  }, []);

  let { id } = useParams(); 
  const [isPost, setPost] = useState([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/posts/${id}`);
    setPost(response.data);
    setTitle(response.data.title);
    setDescription(JSON.parse(response.data.description));

  }


  return (
   
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/Add`} className="button is-danger is-light">
          Add New
        </Link>
        <br /><br />

        <Card>
        
                    <div className="post__list">
                        <h2 className="title_View">Title: {title}</h2>

                        <div className="post__description" dangerouslySetInnerHTML={{ __html: description }}  />
                        <br /><br />
                        <div className='footer-editor'>   
                        <Link to={`/Edit/${isPost.id}`} className="btn btn__theme"> Edit </Link>
                        <Button icon="pi pi-download" className="p-button-rounded p-button-secondary"  onClick={() => Download(isPost.id,description)} aria-label="Bookmark" />

                        </div>
                    </div>
        </Card>
      </div>
    </div>
   
  );
};

export default View;
