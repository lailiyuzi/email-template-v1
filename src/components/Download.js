var FileSaver = require('file-saver');


const Download = (id,description) => {
  
const newData= description;
var blob = new Blob([newData], {type: "text/html;charset=utf-8"});
FileSaver.saveAs(blob, "Mypost.html");

return(
    <></>
)
   
}
export default Download;
