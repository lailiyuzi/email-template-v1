import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './create.css';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorConvertToJSON from './editor';

function Create() {
  const [value1, setValue1] = useState('');


  return (
    <div className='container'>
      <Card>
      <Card.Header style={{background: '#bb0000ff',color: '#FFFFFF' }}>Create</Card.Header>

      <div className='title'>
      <h6 style={{margin: '20px'}}>Title</h6>
                <InputText style={{height: '18px', width: '428px', margin: '20px'}} value={value1} onChange={(e) => setValue1(e.target.value)} />
                {/* <span className="ml-2">{value1}</span> */}
        
      </div>
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>

        <EditorConvertToJSON />

        
      </Card.Body>

      <Card.Footer>
          

          <i className="pi pi-download"></i>
             <Button variant="outline-danger">Save as Draft</Button>{' '}
            <Button variant="danger">Save & View</Button>{' '}
          

      </Card.Footer>

    </Card>

    </div>
    
  );
}

export default Create;