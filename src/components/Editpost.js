import React,{useState,useEffect,useCallback} from 'react';
import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw, ContentState,convertFromHTML,convertFromRaw,RichUtils, Modifier} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './editor.css';
import axios from 'axios';
import {Link } from "react-router-dom";
import PostList from './PostList';

function Editpost({
 sendTitle,sendDescription,editPostID
}) {
  console.log(typeof sendTitle)
  console.log(sendTitle)
  console.log(typeof sendDescription)
  console.log(sendDescription)


      let html = sendDescription.toString();
      let contentBlock = htmlToDraft(html);
      let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      let editorState1 = EditorState.createWithContent(contentState)
      let editorState = EditorState.moveFocusToEnd(editorState1);
      console.log(editorState)
  
      let [description, setDescription] = useState(editorState);
      let onEditorStateChange = (editorState) => {
        setDescription(editorState);
      }

  const [userInfo, setuserInfo] = useState({
    title: sendTitle,
    description: editorState,
  });
  
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 

  // const ondescription = (editorState) => {
  //   setuserInfo({ 
  //     ...userInfo,
  //     description: editorState,
  //   });
  // } 


  // Json Format
    const [contentState1, setContenState1] = useState(ContentState)
      
     const onContentStateChangeJSon = (contentState1) => {
        setContenState1(contentState1)
      };
  

    const updateDetails = async (e) => {
      e.preventDefault();
      e.persist();
      console.log({
        title: userInfo.title,
        description: userInfo.description.value,
      })
      const results = {
        title: userInfo.title,
        description: userInfo.description.value
      }
  
        try {
          axios.patch(`http://localhost:5000/users/${editPostID}`, results).then(res => {
            if(res.success === true){
              console.log("success");
            }
          })
        }
         catch (error) {
          console.log(error);
        }
  
  
        }
  
  
return ( 
  
  <>
  
    <div className="App"> 
        <div className="container">
        <div className="row"> 

  
        <Card style={{minHeight:"320px"}}>
          <form onSubmit={updateDetails} className="update__forms">
            
            <h2 className="myaccount-content"> Create New  </h2>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
                <input type="text" name="title" value={sendTitle} onChange={onChangeValue} className="form-control" placeholder="Title" required />
              </div>
              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                <Card style={{minHeight:"320px"}}>
                  <Editor
                    defaultEditorState={editorState}
                    editorState={description}
                    value={editorState}
                    // // onChange={ondescription}
                    // contentState={contentState1}                    
                    onEditorStateChange={onEditorStateChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
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
          
          {/* <p><textarea disabled value={draftToHtml(convertToRaw(description.getCurrentContent()))}/></p> */}
  
            
          <div className="form-group col-sm-12 text-right">
          <div className='footer-editor'>        
             <Button icon="pi pi-download" className="p-button-rounded p-button-secondary" aria-label="Bookmark" />
             <Button label="Save as Draft" className="p-button-raised p-button-danger p-button-text" />
             <Link to="/View"><Button label="Save & View" className="p-button-danger" type="submit" /> </Link>
          </div>
          </div>  
  
            </div> 
          </form>
          </Card>
          </div>
                  <PostList />
        </div>
      </div>
   
  </>
  )
 
}
export default Editpost;
