import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
// import {Socket, io}  from 'socket.io-client'
import { Link } from "react-router-dom";
const MoviesList = ({ socket }) => {
  const [lista, setLista] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getMovies", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setLista(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




const logOutHandler = (e)=>{
  e.preventDefault()
  axios.post('http://localhost:8000/api/logout', {withCredentials:true, credentials:'include'})
  navigate('/movies')
  .then((res)=>{
      console.log(res)
      navigate('/movies')
  }).catch((err)=>{
      console.log(err)
  })
}


  socket.on("movieDeleted", (idBorrado) => {
    console.log("Movie deleted with id es:", idBorrado);
    setLista(lista.filter((movie) => movie._id !== idBorrado));
  });

  return (
    <div className="col-9 mx-auto">
      <div className="d-flex flex-wrap mt-6">
        <h2 className="m-5"> Movie List</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> Movie Title</th>
              <th scope="col">Avg Rating</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((movie, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td> {movie.title}</td>
                <td>{movie.ratings}</td>
                <td>
                  <Link
                    type="button"
                    className="btn btn-primary m-2"
                    to={`/readReviews/${movie._id}`}
                  >
                    Read Reviews
                  </Link>
                  <Link
                    type="button"
                    className="btn btn-success m-2"
                    to={`/writeReview/${movie._id}`}
                  >
                    Write a Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link type="button" className="btn btn-info m-2" to={`/movies/new`}>
          Add New Movie
       </Link>
       {/* <button className="btn btn-danger" onClick={logOutHandler}>Log Out</button> */}
    </div>
    
  );
};

export default MoviesList;
