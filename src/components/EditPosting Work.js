import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './editor.css';
import axios from 'axios';
import {Link } from "react-router-dom";
import PostList from './PostList';



class EditPosting extends Component {
  constructor(props) {
    super(props);

    this.state = {editorState: EditorState.createEmpty(),
                  title: props.sendTitle}

  }

  componentDidUpdate(prevProps) {
    if (this.props.sendDescription !== prevProps.sendDescription) {
        this.setState({
                editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.props.sendDescription))),
                title: this.props.sendTitle
        });
    }
}

onEditorStateChange = (editorState) => {
    this.setState({editorState})
};

onChange = (e) =>{
  this.setState({name: e.target.value});
}

updateDetails = async (e) => {
  e.preventDefault();
  e.persist();
  console.log({
    title: this.title,
    description: this.editorState,
  })
  const results = {
    title: this.title,
    description: this.editorState,
  }

    try {
      axios.patch(`http://localhost:5000/users/${this.props.editPostId}`, results).then(res => {
        if(res.success === true){
          console.log("success");
        }
      })
    }
     catch (error) {
      console.log(error);
    }


    }

  render() {
    
    const { editorState } = this.state;
    return (
      <div>
        <div className="App"> 
        <div className="container">
        <div className="row"> 

  
        <Card style={{minHeight:"320px"}}>
          <form onSubmit={this.updateDetails} className="update__forms">
            
            <h2 className="myaccount-content"> Edit  </h2>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
                <input type="text" name="title" defaultValue={this.state.title} onChange={this.onChange} className="form-control" placeholder="Title" required />
              </div>
              <div className="form-group col-md-12 editor">
                <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                <Card style={{minHeight:"320px"}}>
        
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                />

                {/* <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } /> */}
                </Card>
              </div>
              <br />
              
  
              
          {/* <p><textarea disabled value={JSON.stringify(contentState1, null, 4)} /></p> */}
          
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
      </div>
    );
  }
}export default EditPosting;