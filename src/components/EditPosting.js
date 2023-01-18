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
                  title: props.sendTitle,
                  description: ""
                }

  }

  componentDidUpdate(prevProps) {
    if (this.props.sendDescription !== prevProps.sendDescription) {
        this.setState({
                editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.props.sendDescription))),
                title: this.props.sendTitle,
                           
        });
    }
}


onChange = (e) =>{
  this.setState({title: e.target.value});
}

onEditorStateChange = (editorState) => {
    this.setState({editorState})
};

onContentStateChange = (contentState) => {
  this.setState({
    contentState,
  });
};

updateDetails = async (e) => {
  e.preventDefault();
  e.persist();
  console.log({
    title: this.state.title,
    description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
  })
  const results = {
    title: this.state.title,
    description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
  }
  const id = this.props.editPostID;
  console.log(results)
  console.log(this.props.editPostID)

    try {
      axios.patch(`http://localhost:5000/users/${id}`, results).then(res => {
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
                  onContentStateChange={this.onContentStateChange}
                />

                <textarea style={{display:'none'}} disabled ref={(val) => this.description = val} value={draftToHtml(editorState.getCurrentContent()) } />
                </Card>
              </div>
              <br />
              
  
              
          <p><textarea disabled value={JSON.stringify(this.state.contentState, null, 4)} /></p>
          
          <p><textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}/></p>
  
            
          <div className="form-group col-sm-12 text-right">
          <div className='footer-editor'>        
             <Button icon="pi pi-download" className="p-button-rounded p-button-secondary" aria-label="Bookmark" />
             <Button label="Save" className="p-button-raised p-button-danger p-button-text" />
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