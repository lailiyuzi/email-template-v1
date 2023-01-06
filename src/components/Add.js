import React,{useState} from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'draft-js/dist/Draft.css';
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './editor.css';
import axios from 'axios';


const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

const Add = () => {

  let history = useNavigate();
  
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

  

  const addDetails = async (event) => {
    event.preventDefault();
    event.persist();
    console.log(JSON.stringify({
      title: userInfo.title,
      description: contentState1
    }))

      try {
        axios.post('http://localhost:5000/users', async (req, res) => {
        res.send(JSON.stringify({
          body: {
          title: userInfo.title,
          description: contentState1 }
        }));
      });


      } catch (error) {
        console.log(error);
      }
    
    }

   
  
      
return ( 
<>

  <div className="App">
      <div className="container">
      <div className="row"> 
      <Card style={{minHeight:"320px"}}>
        <form onSubmit={addDetails} className="update__forms">
          <h3 className="myaccount-content"> Add  </h3>
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
            <button type="submit" className="btn btn__theme"> Submit  </button>
            </div> 

            <div className='footer'>        
           <Button icon="pi pi-download" className="p-button-rounded p-button-secondary" aria-label="Bookmark" />
           <Button label="Save as Draft" className="p-button-raised p-button-danger p-button-text" />
           <Button label="Save & View" className="p-button-danger" />

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
