import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Editpost from './Editpost';
import { useParams } from "react-router-dom";
import EditPosting from './EditPosting';




const Edit = () => {

  let { id } = useParams(); 
  console.log(id)

  useEffect(() => {
    getUserById();
    }, []);
        
  const [ispostId, setpostId] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 



      const getUserById = async () => {
        console.log("nowView")
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setpostId(response.data);
        setTitle(response.data.title);
        setDescription(JSON.parse(response.data.description));

      }
      
    
  
        
return (
<>
    <EditPosting sendTitle={title} sendDescription={description} editPostID={id} />      
  
</>
)
}
export default Edit;
