import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const ReadReviews = ({socket}) => {   
     // edicion de objeto-documento
     const [movie, setMovie] = useState({})
    
     // obtener id de url
     const {id} = useParams()
     const navigate = useNavigate()

     useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneMovie/${id}` , {withCredentials:true} )
        .then((res)=>{
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    const deleteHandler =()=>{
        socket.emit('deleteMovie', id)
        navigate('/movies')
        //  axios.delete(`http://localhost:8000/api/deleteMovie/${id}`)
        //  .then((res)=>{
        //      navigate('/movies')
        //  }).catch((err)=>{
        //      console.log(err)
        //  })
    }


  return (


<div className="col-9 mx-auto">
<div className="d-flex flex-wrap mt-6">
  <h2 className='m-5'> {movie.title}</h2>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col"> Reviewer</th>
        <th scope="col">Rating</th>
        <th scope="col">Review</th>
      </tr>
    </thead>
    <tbody>
      {movie.reviews && movie.reviews.length > 0 && movie.reviews.map((review, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td> {review.name}</td>
          <td>{review.rating}</td>
          <td>{review.comment}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<button className="btn btn-danger" onClick={deleteHandler}>Delete Movie</button>
</div>

  )
}

export default ReadReviews