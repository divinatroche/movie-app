import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateMovie = () => {
    const [titulo, setTitulo] = useState('')
    //const [creador, setCreador] = useState('')
    const [rating, setRating] = useState('')



      // edicion de objeto-documento
    //   const [serie, setSerie] = useState({})
    
      // obtener id de url
      const {id} = useParams()
      const navigate = useNavigate()

      
  useEffect(() => {
        axios.get(`http://localhost:8000/api/getOneMovie/${id}`)
        .then((res)=>{
            console.log(res)
            setTitulo(res.data.title)
            //setCreador(res.data.creador)
            setRating(res.data.rating)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])


    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/updateMovie/${id}`, {
            titulo,
            //creador,
            rating
        }).then((res)=>{
            console.log(res);
            navigate('/movies')
        }).catch((err)=>{
            console.log(err)
        })
    }


  return (
    <div className='col-6 mx-auto'>
        <h1> Update Movie</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor=""  className='form-label'>Titulo</label>
            <input type="text" value={titulo} className='form-control' onChange={(e)=>setTitulo(e.target.value)}/>
{/*             <label htmlFor="" className='form-label'>Creador</label>
            <input type="text" value={creador} className='form-control'onChange={(e)=>setCreador(e.target.value)}/> 
            <label htmlFor="" className='form-label'> Rating</label>
            <input type="number" value={rating}className='form-control'onChange={(e)=>setRating(e.target.value)}/>*/}
            <button className='btn btn-success mt-3'>Update Movie</button>
        </form>
    </div>
  )
}

export default UpdateMovie