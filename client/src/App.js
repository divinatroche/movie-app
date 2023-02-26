import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {io} from 'socket.io-client';
import { useState, useEffect } from 'react';
import MovieForm from './components/MovieForm';
import Navbar from './components/Navbar';
import MoviesList from './components/MoviesList';
import UpdateMovie from './components/UpdateMovie';
import Registro from './components/Registro';
import Login from './components/Login';
import ReadReviews from './components/ReadReviews';
import WriteReview from './components/WriteReview';

function App() {

  //set de socket desde el cliente
  const [socket] = useState(()=>io(':8000'))

  useEffect(()=>{
    socket.on('connection', ()=>{
      console.log(' coneccion establecida al servidor')
    })
    return ()=> socket.disconnect(true); // esto sucedera cuando salimos de la pagina o refrescamos
  },[])


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/movies/new' element={<MovieForm/>}/>
          <Route path='/updateMovie/:id' element={<UpdateMovie/>}/>
          <Route path='/movies'element={<MoviesList socket={socket}/>}/>
          <Route path='/registro'element={<Registro/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/readReviews/:id' element={<ReadReviews socket={socket}/>}/>
          <Route path='/writeReview/:id' element={<WriteReview/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
