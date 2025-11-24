
import './App.css';
import AddWarrantyForm from './components/AddWarrantyForm';
import Body from './components/Body';
import Footer from './components/Footer';
import Login from './components/Login';
// import DemoData from './components/DemoData';
import Navbar from './components/Navbar';
import WarrantyCheck from './components/WarrantyCheck';
import{RouterProvider, createBrowserRouter} from 'react-router-dom'



const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
     children: [
      { path: "login", element: <Login/> },
      {path:'warrantyCheck', element:<WarrantyCheck/>},
      {path:'warrantyForm', element:<AddWarrantyForm/>},
    ]
  },
  
  
  

])

function App() {
  return (
    <div className="App">
     <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
