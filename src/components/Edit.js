import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Editpost from './Editpost';
import { useParams } from "react-router-dom";



const Edit = () => {

  let { id } = useParams(); 
  console.log(id)

  useEffect(() => {
    getUserById();
    }, []);
        
  const [ispostId, setpostId] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  console.log(typeof title)
  console.log(title)
  console.log(typeof description)
  console.log(description)

  // const sendPost=JSON.stringify(ispostId)
  // console.log("changeTo")
  // console.log(sendPost)
  // console.log(typeof sendPost)



      const getUserById = async () => {
        console.log("nowView")
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setpostId(response.data);
        setTitle(response.data.title);
        setDescription(JSON.parse(response.data.description));

      }
      
    
  
        
return (
<>
    <Editpost sendTitle={title} sendDescription={description} editPostID={id} />      
    
</>
)
}
export default Edit;
