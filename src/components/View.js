import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { convertFromHTML } from 'draft-js';


const View = () => {
  const [users, setUser] = useState([]);
  console.log(users)
  const [isPost, setPost] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
    setPost(response.data.slice(-1));
    console.log(response.data)
    
  };

  const getLastPost = () => {
    let arry = users;
    let lastElement = arry.slice(-1);;
    console.log(lastElement);

  }

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
                        <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>
                    </div>
                    ))}
        </Card>
      </div>
    </div>
   
  );
};

export default View;
