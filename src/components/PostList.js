import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';

const PostList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/posts");
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={`/Add`} className="button is-danger is-light">
          Add New
        </Link>
        <br /><br />

        <Card>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>
                <Link
                    to={`/View/${user.id}`}
                    className="postList_title"
                  >
                  {user.title}
                  </Link>
                  </td>
                
                <td>
                  <Link
                    to={`/Edit/${user.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Card>
      </div>
    </div>
   
  );
};

export default PostList;
