import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import './editor.css';
import axios from 'axios';
import {Link } from "react-router-dom";



class EditPosting extends Component {
  constructor(props) {
    super(props);

    this.state = {editorState: EditorState.createEmpty(),
                  title: props.sendTitle,
                  description: ""
                }
    this.save = this.save.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.sendDescription !== prevProps.sendDescription) {
        this.setState({
                editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.props.sendDescription))),
                title: this.props.sendTitle,
                           
        });
    }
}

save() {
  this.toast.show({severity: 'success', summary: 'Success', detail: 'Data Saved'});
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
      axios.patch(`http://localhost:5000/posts/${id}`, results).then(res => {
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
         <Toast ref={(el) => this.toast = el}></Toast>
        <div className="App"> 
        <div className="container">
        <div className="row"> 

        <br /> <br />
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

                <textarea style={{display:'none'}} disabled ref={(val) => this.description = val} value={draftToHtml(editorState.getCurrentContent()) } />
                </Card>
              </div>
              <br />
              
  
              
          <p><textarea disabled value={JSON.stringify(this.state.contentState, null, 4)} /></p>
          
          <p><textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}/></p>
  
            
          <div className="form-group col-sm-12 text-right">
          <div className='footer-editor'> 
             <Button label="Save" onClick={this.save} className="p-button-raised p-button-danger p-button-text" />
             <Link to={`/View/${this.props.editPostID}`}><Button label="Save & View" className="p-button-danger" type="submit" /> </Link>
          </div>
          </div>  
  
            </div> 
          </form>
          </Card>
          </div>
                
        </div>
      </div>
      </div>
    );
  }
}export default EditPosting;