
import './App.css';
import AddWarrantyForm from './components/AddWarrantyForm';
// import DemoData from './components/DemoData';
import Navbar from './components/Navbar';
import WarrantyCheck from './components/WarrantyCheck';
// import Login from './components/Login';

function App() {
  return (
    <div className="App">
     <Navbar/>
    {/* <DemoData/> */}
    <WarrantyCheck/>
    <AddWarrantyForm/>
    </div>
  );
}

export default App;
