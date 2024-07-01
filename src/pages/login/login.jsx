import React, { useState } from 'react'
import "./login.scss"
import { FaRegUserCircle } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai"
import Background  from "../../assets/pattern.svg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormField = ({icon , name , placeholder , formData ,setFormData }) => {
  const handleOnChange = (e) => {

    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  return <div className='input'>
    <div className="icon_holder">{icon}</div>
    <div className="input_holder">
      <input value={formData[name]} onChange={handleOnChange} placeholder={placeholder.toUpperCase()} name={name} type={name == 'password' ? 'password' : "email"}/> 
    </div>
  </div>
} 

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  })
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try{
      const res = await axios.post('http://localhost:3000/login', formData)

      console.log(res)
      localStorage.setItem('token' , res?.data?.token)
      navigate('/')
    }catch(err){
      if(err?.response?.data?.message) alert(err.response.data.message)
      console.log(err)
    }


  }
  return (
    <div className='login'>
      <div className="login_container">
        <div className="login_top">
          {/* Wave Backgroud */}
          <img className='login_top_bg' src={Background}/>
          <div className="login_header">Login</div>
          <div className="login_icon">
            <FaRegUserCircle className='icon'/>
          </div>
        </div>
        <div className="login_bottom">
          {/* Actual Form */}
          <form onSubmit={handleSubmit}>
            <FormField formData={formData}  setFormData={setFormData} name={'email'} placeholder={'email'} icon={<MdEmail/>} />
            <FormField formData={formData}  setFormData={setFormData} name={'password'} placeholder={'password'} icon={<FaLock/>} />
            <div className='forgot_password'>
              <p onClick={() => navigate('/register')}>Don't have account ?</p>
              <p>Forgot your password ?</p>
            </div>

            <button className="login_button"type='submit' >Login</button> 
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
