import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Create} from './template';
import {Table} from './History';



function App() {
  return (
    <div>
     <Create />
     <Table/>
    </div>
  );
}

export default App;
