import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import NewContact from './pages/NewContact/NewContact';
import Contact from './pages/Contact/Contact';
import EditContact from './pages/EditContact/EditContact';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/newContact' element={<NewContact/>}/>
        <Route path='/contact/:id' element={<Contact/>}/> 
        <Route path='/editContact/:id' element={<EditContact/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
