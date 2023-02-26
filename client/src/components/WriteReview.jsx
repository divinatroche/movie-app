import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const WriteReview = () => {
    const [movie, setMovie] = useState({})


    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')



    
      // obtener id de url
      const {id} = useParams()
      const navigate = useNavigate()


      useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneMovie/${id}`/* , {withCredentials:true} */)
        .then((res)=>{
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])


    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/newReview/${id}`, {  
        name,
            rating,
            comment
        }).then((res)=>{
            console.log(res);
            navigate('/movies')
        }).catch((err)=>{
            console.log(err)
        })
    }


  return (
    <div className='col-6 mx-auto'>
        <h1> {movie.title}</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor=""  className='form-label'>Your Name</label>
            <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="" className='form-label'>  Your Rating</label>
            <input type="number"  className='form-control'onChange={(e)=>setRating(e.target.value)}/>
            <label htmlFor="" className='form-label'>  Your Review</label>
            <input type="text" className='form-control'onChange={(e)=>setComment(e.target.value)}/>
            <button className='btn btn-success mt-3'>Add review</button>
        </form>
    </div>
  )
}

export default WriteReview