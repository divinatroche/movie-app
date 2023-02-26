import axios from 'axios'
import React, {useState,useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const OneMovie = ({socket}) => {   
     // edicion de objeto-documento
     const [movie, setMovie] = useState({})
    
     // obtener id de url
     const {id} = useParams()
     const navigate = useNavigate()

     useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneMovie/${id}`, {withCredentials:true})
        .then((res)=>{
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }, [])

    const deleteHandler =()=>{
        socket.emit('deleteMovie', id)
        navigate('/movies')
        // axios.delete(`http://localhost:8000/api/borrarserie/${id}`)
        // .then((res)=>{
        //     navigate('/todaseries')
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }


  return (
    <div className='col-6 mx-auto'>
        <p> Titulo: {movie.title}</p>
{/*         <p> Creador: {serie.creador}</p> */}
        <Link to={`/updateMovie/${id}`}> Update Movie</Link>
        <button className="btn btn-danger" onClick={deleteHandler}>Delete Movie</button>

    </div>
  )
}

export default OneMovie