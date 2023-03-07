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

import axios from 'axios'

function App() {

  //set de socket desde el cliente
  const [socket] = useState(()=>io(':8000'))
  const URL_IMG_BASE = "https://image.tmdb.org/t/p/w500/"

  useEffect(()=>{
    socket.on('connection', ()=>{
      console.log(' coneccion establecida al servidor')
    })
    return ()=> socket.disconnect(true); // esto sucedera cuando salimos de la pagina o refrescamos
  },[])

  const [mediaList, setMediaList] = useState([]);

  //para axios
  useEffect(() =>{
    const loadMediaList = async () => {
      try{
        const resultado = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=faca0c9dd9d60364e21dafb4d184f454')
        console.log(resultado)
        setMediaList(resultado.data.results)
       }
       catch(error){
         console.log(error)
   
       }
    }
    loadMediaList()
  }, []) 

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
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
      <div className="container d-flex flex-wrap" style={{pading: "1rem"}} >
      {
        mediaList.map((results, index)=>(
          <div className="card border-dark mb-3" style={{width: "18rem",margin: "10px"}} key={index}>
          <img src= {URL_IMG_BASE + results.poster_path}  className="card-img-top" alt="..."/>
          <div className="card-body">
            <h4 className="card-title">{results.title}</h4>
            {/* <p className="card-text">{results.overview}</p> */}
              <p className="card-text">Rate: {results.vote_average}</p>
            <a href="#" className="btn btn-primary">More Details</a>
          </div>
        </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;
