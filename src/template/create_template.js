import {React, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';

import './create.css';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorConvertToJSON from './editor';
import { Button } from 'primereact/button';


function Create() {

  const defaultValues = {
    name: ''
}
  const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

  const[input,setInput] = useState({
    title:'',
    content:''
  })

  function handleChange(event){
    const [name,value] =event.target

    setInput(prevInput => {
        return{
          ...prevInput,
          [name]:value
        } } )
}

  function setState(event){
    event.preventDefault(); //event that prevent the page to refresh page after click button
    console.log(input);

  }


  return (
    <div className='container'>
      <Card>
      <Card.Header style={{background: '#bb0000ff',color: '#FFFFFF' }}>Create</Card.Header>

      <div className='title'>
      <h6>Title</h6>
                
                <Controller name="title" control={control}  placeholder="title" render={({ field, fieldState }) => (<InputText style={{height: '35px', width: '-webkit-fill-available', margin: '20px'}} id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />)} />
        
      </div>
      <Card.Body>
        
      <EditorConvertToJSON />
      <br />
      
      
      </Card.Body>

      <Card.Footer>
          

            <i className="pi pi-download"></i>
             <Button label="Save as Draft" className="p-button-raised p-button-danger p-button-text" />
             <Button label="Save & View" className="p-button-danger" />
          

      </Card.Footer>

    </Card>

    </div>
    
    
  );
}

export default Create;