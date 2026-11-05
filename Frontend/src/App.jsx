import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
 import Register from './pages/Register';
  import Home from './pages/Home';
   import Crops from './pages/Crops';
 import CropDetails from './pages/CropDetails'; 
 import Profit from './pages/Profit'; 
 import About from './pages/About'; 
 import NotFound from './pages/NotFound';
const protectedPage = (Page) => <ProtectedRoute><Page /></ProtectedRoute>;
export default function App(){ 
     return <Routes><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/" element={protectedPage(Home)}/><Route path="/crops" element={protectedPage(Crops)}/><Route path="/crops/:id" element={protectedPage(CropDetails)}/><Route path="/profit" element={protectedPage(Profit)}/><Route path="/about" element={protectedPage(About)}/><Route path="*" element={<NotFound/>}/></Routes>; }
