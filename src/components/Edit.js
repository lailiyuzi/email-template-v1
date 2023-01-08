import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Editpost from './Editpost';
import { useParams } from 'react-router-dom';


const Edit = (props) => {

  const { id } = useParams();

  useEffect(() => {
    viewPostId();
  }, []);
        
  const [ispostId, setpostId] = useState([]);

  const viewPostId = async() =>{
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setpostId(response.data)
      console.log(response.data)
    } 
  
        
return (
<>
  {ispostId.length > 0 ? <>    
    <Editpost postList={ispostId}  editPostID={ispostId.id} />      
  </> : null }

</>
)
}
export default Edit;
