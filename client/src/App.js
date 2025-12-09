
import './App.css';
import AddWarrantyForm from './components/AddWarrantyForm';
import Body from './components/Body';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
// import DemoData from './components/DemoData';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SupportBrand from './components/SupportBrand';
import WarrantyCheck from './components/WarrantyCheck';
import{RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'; 
import RequireAuth from './components/RequireAuth';
import ServiceCenter from './components/ServiceCenter';
import AboutUs from './components/AboutUs';
import ContactMe from './components/ContactMe';
import Career from './components/Career';



const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Body/>,
     children: [
      { index: true, element: <Home/> }, 
      { path: "login", element: <Login/> },
      {path:'/warrantyCheck', element:<WarrantyCheck/>},
      {path:'/warrantyForm', element:<RequireAuth><AddWarrantyForm/></RequireAuth>},
      {path:'/signup', element:<SignUp/>},
      {path:'/servicecenter', element:<ServiceCenter/>},
      {path:'/aboutus',element:<AboutUs/>},
      {path:'/contact',element:<ContactMe/>},
      {path:'/career',element:<Career/>},
    ]
  },
  
  
  
  
  

])

function App() {
  return (
    <AuthProvider>
    <div className="App">
      
     <RouterProvider router={appRouter} />
     
    </div>
    </AuthProvider>
  );
}

export default App;
