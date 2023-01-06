import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './App.css';


import {Add,Edit,Home} from "./components";
function App() {
  return (
    <div>
      <Router>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Add" element={<Add />} />
          <Route path="/Edit/:postID" element={<Edit />}/>
      </Routes>
      </Router>
    </div>
  );
}
export default App;
