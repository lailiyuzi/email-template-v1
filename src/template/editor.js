import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './editor.css';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToJSON extends Component {
  
 //Convert Html = Editor State 

 constructor(props) {
  super(props);

  //Conversion to Json state
  const contentState1 = convertFromRaw(content);
    this.state = {
      contentState1,
    }

// Conversion to Html state
  const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
  const contentBlock = htmlToDraft(html);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    };
  }
}


   //Conversion to Json state

  onContentStateChangeJSon = (contentState1) => {
    this.setState({
      contentState1,
    });
  };

  // Conversion to Html state

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { contentState1 } = this.state; //ConvertToJson
    const { editorState } = this.state; //ConvertToHtml
    console.log(editorState);


    return (
      <div>
        <Editor toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"  editorClassName="editorClassName" onContentStateChange={this.onContentStateChangeJSon} mention={{ separator: ' ', trigger: '@', suggestions: [ { text: 'APPLE', value: 'apple', url: 'apple' },{ text: 'BANANA', value: 'banana', url: 'banana' },{ text: 'CHERRY', value: 'cherry', url: 'cherry' },{ text: 'DURIAN', value: 'durian', url: 'durian' },{ text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },{ text: 'FIG', value: 'fig', url: 'fig' },{ text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },{ text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },],}} editorState={editorState} onEditorStateChange={this.onEditorStateChange}  />
        

      <p><textarea disabled value={JSON.stringify(contentState1, null, 4)} /></p>
        
      <p><textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /></p>
      </div>
      
    );
  }
}

export default EditorConvertToJSON;