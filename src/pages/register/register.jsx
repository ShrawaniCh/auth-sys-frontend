import React, { useState } from 'react'
import "./register.scss"
import { FaRegUserCircle } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import Background  from "../../assets/pattern.svg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormField = ({icon , name , placeholder , formData ,setFormData , type }) => {
  const handleOnChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  return <div className='input'>
    <div className="icon_holder">{icon}</div>
    <div className="input_holder">
      <input value={formData[name]} onChange={handleOnChange} placeholder={placeholder.toUpperCase()} name={name} type={type}/> 
    </div>
  </div>
} 

const Register = () => {
  const [formData, setFormData] = useState({
    email :  "",
    password  :"",
    dob : "",
    name :""
  })
  const navigate = useNavigate()
 

  const handleSubmit =async (e) => {
    e.preventDefault()
    console.log('REGI' , formData)
    try{
      const res = await axios.post('http://localhost:3000/register', formData)
      localStorage.setItem('token' , res?.data?.token)
      navigate('/')
    }catch(err){
      if(err?.response?.data?.message) alert(err.response.data.message)
      console.log(err , { data : err.response.data.message})
    }

  }
  return (
    <div className='register'>
    <div className="register_container">
      <div className="register_top">
        {/* Wave Backgroud */}
        <img className='register_top_bg' src={Background}/>
        <div className="register_header">Register</div>
        <div className="register_icon">
          <FaRegUserCircle className='icon'/>
        </div>
      </div>
      <div className="register_bottom">
        {/* Actual Form */}
        <form onSubmit={handleSubmit}>
          <FormField formData={formData} setFormData={setFormData} name={'name'} type={'text'} placeholder={'name'} icon={<FaRegUser/>} />
          <FormField formData={formData} setFormData={setFormData} name={'email'} type={'email'} placeholder={'email'} icon={<MdEmail/>} />
          <FormField formData={formData} setFormData={setFormData} name={'dob'} type={'date'} placeholder={'date of birth'} icon={<CiCalendarDate/>} />
          <FormField formData={formData} setFormData={setFormData} name={'password'} type={'password'} placeholder={'password'} icon={<FaLock/>} />
          <div className='have_account'>
            <p onClick={() => navigate('/login')}>Already have account ?</p>
          </div>

          <button className="register_button"type='submit' >Register</button> 
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register
