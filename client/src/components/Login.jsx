import React, { useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, {withCredentials:true, credentials:'include'})
        .then((res)=>{
            console.log(res)
            navigate('/movies')
        }).catch((err)=>{
            console.log(err)
        })
    } 


    

  return (
    <div className='col-6 mx-auto'>
        <h2> Log In</h2>
        <form onSubmit={submitHandler} className='col-6 mx-auto'>   
            <label htmlFor="" className='form-label'>Email:</label>
            <input type="text" className='form-control'onChange={(e)=>setEmail(e.target.value)}/>
            {errors.email ?<div class="alert alert-danger mt-3" role="alert">{errors.email.message}</div> : null}

            <label htmlFor="" className='form-label'> Password</label>
            <input type="password" className='form-control'onChange={(e)=>setPassword(e.target.value)}/>
            {errors.password ?<div class="alert alert-danger mt-3" role="alert">{errors.password.message}</div> : null}
            
            <button className='btn btn-success mt-3'> Login</button>
        </form>
    </div>
  )
}

export default Login