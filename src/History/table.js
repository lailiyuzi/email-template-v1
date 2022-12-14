
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './ProductService';
import {Button} from 'primereact/button';

import './table.css';

const Table = () => {
    const [products, setProducts] = useState([]);
    const productService = new ProductService();

    useEffect(() => {
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (value) => {
        return value;
    }

    const actionTemplate = (rowData, Column) => {
        console.log('column', Column);
        console.log('rowData', rowData);
        return (<div>
          <Button label="Edit" className="p-button-success"  />
          <Button label="Delete" className="p-button-warning" />
        </div>);
      };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

   
    const statusBodyTemplate = (rowData) => {
        return <Button className={`product-badge status-${rowData.status}`}>{rowData.status.toLowerCase()}</Button>;
    }


    const header = (
        <div className="table-header">
            History
       </div>
    );
    const footer = `In total there are ${products ? products.length : 0} products.`;

    return (
        <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={products} header={header} footer={footer} responsiveLayout="scroll">
                {/* Date */}
                    <Column field="date" header="Date" body={dateBodyTemplate}></Column>
                {/* Title */}
                    <Column field="title" header="Title"></Column>
                {/* Status */}
                    <Column header="Status" body={statusBodyTemplate} style={{font:'13px',margin:'10px'}} ></Column>
                   
                {/* Action */}
                <Column rowEditor bodyStyle={{ textAlign: 'center' }}></Column>
                     <Column body={actionTemplate} header="Actions" />

                    
                </DataTable>
            </div>
        </div>
    );
}
                 



export default Table;