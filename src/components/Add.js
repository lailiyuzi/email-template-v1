import React,{useState,useRef} from 'react';
import axios from 'axios';
import { EditorState, convertToRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import './editor.css';
import { Link} from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';


const Add = () => {

  const toast = useRef(null);

   // Json Format
  const [contentState1, setContenState1] = useState(ContentState)
    
   const onContentStateChangeJSon = (contentState1) => {
      setContenState1(contentState1)
    };

  const [userInfo, setuserInfo] = useState({
    title: '',
    description:{}
  });

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  }


  const save = () => {
    toast.current.show({severity: 'success', summary: 'Success', detail: 'Data Saved'});
}


  
  const addDetails = async (event) => {
    event.preventDefault();
    event.persist();
    console.log({
      title: userInfo.title,
      description: userInfo.description.value,
    })
    const results = {
      title: userInfo.title,
      description: userInfo.description.value
    }

      try {
        axios.post('http://localhost:5000/posts', results).then((res) => {
          console.log("success");
          
        })
      }
       catch (error) {
        console.log(error);
      }


      }
    
    


  
      
return ( 
<>
<Toast ref={toast}></Toast>

  <div className="App"> 
      <div className="container">
      <div className="row"> 
      <br /> <br />

      <Card style={{minHeight:"320px"}}>
        <form onSubmit={addDetails} className="update__forms">
          
          <h2 className="myaccount-content"> Create New  </h2>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
            </div>
            <div className="form-group col-md-12 editor">
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
              <Card style={{minHeight:"320px"}}>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                  onContentStateChange={onContentStateChangeJSon}
                  mention={{ separator: ' ', trigger: '@', 
                  suggestions: [
                    { text: 'APPLE', value: 'apple', url: 'apple' },
                    { text: 'BANANA', value: 'banana', url: 'banana' },
                    { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                    { text: 'DURIAN', value: 'durian', url: 'durian' },
                    { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                    { text: 'FIG', value: 'fig', url: 'fig' },
                    { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                    { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                  ],}}
                />
              <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
              </Card>
            </div><br />
            

            
        <p><textarea disabled value={JSON.stringify(contentState1, null, 4)} /></p>
        
        <p><textarea disabled value={draftToHtml(convertToRaw(description.getCurrentContent()))}/></p>

          
        <div className="form-group col-sm-12 text-right">
        <div className='footer-editor'>                   
           <Button label="Save" onClick={save} className="p-button-raised p-button-danger p-button-text" />
           <Link to={`/ViewLast`}><Button label="Save & View" className="p-button-danger" type="submit" /> </Link>
        </div>
        </div>  

          </div> 
        </form>
        </Card>
        </div>
                
      </div>
    </div>
 
</>
)
}
export default Add;
