import React,{useState} from 'react';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Editpost(props) {
  let history = useNavigate();
  console.log(props.ispostId[0].title)
  const [userInfo, setuserInfo] = useState({
    title: props.ispostId[0].title,
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  let editorState = EditorState.createWithContent(
  ContentState.createFromBlockArray(
    convertFromHTML(props.ispostId[0].description)
  ));
  const [description, setDescription] = useState(editorState);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  }


  const PoemAddbooks = async (event) => {
      event.preventDefault();
      event.persist();
      const results = {
        title: userInfo.title,
        description: userInfo.description }

      try {
        axios.post('http://localhost:5000/users', results).then(res => {
          if(res.success === true){
            // history('/PostList');
          }
        }).then((res) => {
          console.log("success");
        });
      }
       catch (error) {
        console.log(error);
      }

  }

  
return (
<div className="App">
  <div className="container">
    <div className="row"> 
      <form onSubmit={PoemAddbooks} className="update__forms">
        <h3 className="myaccount-content"> Edit   </h3>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
            <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
          </div>
          <div className="form-group col-md-12 editor">
            <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
            <Editor
              editorState={description}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />
            <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
          </div>
          <div className="form-group col-sm-12 text-right">
            <button type="submit" className="btn btn__theme"> Submit  </button>
          </div> 
        </div>
      </form>
    </div>
  </div>
</div>
)
}
export default Editpost;
