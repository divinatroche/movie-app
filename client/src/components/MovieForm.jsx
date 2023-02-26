import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const MovieForm = () => {
    const [title, setTitle] = useState('')
    //const [creador, setCreador] = useState('')


    //const [name, setName] = useState('')
    //const [rating, setRating] = useState('')
    //const [comment, setComment] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()


    const submitHandler = (e) =>{
        e.preventDefault()


        axios.all([
            axios.post('http://localhost:8000/api/newMovie',  {
                title
                
            })
            // ,
            // axios.put('http://localhost:8000/api/newReview', {
            //     name,
            //     rating,
            //     comment
            // })

          ]
        
        ).then((res)=>{
            console.log(res, "LLega por THEN");
            navigate('/movies')
        }).catch((err)=>{
            console.log(err, "LLEGA POR CATCH")
            setErrors(err.response.data.errors)
        })
    }


  return (

    <div className='col-6 mx-auto'>
        {/* <h2 className='m-5'> Submit Movie and a Review</h2> */}
         <h2 className='m-5'> Submit Movie</h2>
        <form onSubmit={submitHandler}>
            <label htmlFor=""  className='form-label'>Movie Title</label>
            <input type="text" className='form-control' onChange={(e)=>setTitle(e.target.value)}/>
            {errors.title ?<div class="alert alert-danger mt-3" role="alert">{errors.title.message}</div> : null}
            {/* 
            <label htmlFor="" className='form-label'>Your Name</label>
            <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/> 

            <label htmlFor="" className='form-label'> Rating</label>
            <input type="number" className='form-control'onChange={(e)=>setRating(e.target.value)}/>
            {errors.rating ?<div class="alert alert-danger mt-3" role="alert">{errors.rating.message}</div> : null}

            <label htmlFor="" className='form-label'>Your Review</label>
            <textarea type="text" className='form-control'/>
            {errors.comment ?<div class="alert alert-danger mt-3" role="alert">{errors.comment.message}</div> : null}*/}
            <button className='btn btn-success  m-3'> Submit</button>
            <button className='btn btn-secondary m-3'> Cancel</button>
        </form>
    </div>
  )
}

export default MovieForm