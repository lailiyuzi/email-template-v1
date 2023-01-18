import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import './App.css';


import {Add,Edit,Home, PostList,View,EditPosting} from "./components";
function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Add" element={<Add />} />
          <Route path="/Edit/:id" element={<Edit />}/>
          <Route path="/PostList" element={<PostList />}/>
          <Route path="/View" element={<View />}/>
          {/* <Route path="/View/Edit/:id" element={<Edit />}/> */}

          <Route path="/EditPosting/:id" element={<EditPosting />}/>


      </Routes>
      </Router>
    </div>
  );
}
export default App;
