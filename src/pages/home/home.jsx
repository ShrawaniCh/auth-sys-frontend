import React, { useEffect, useState } from 'react'
import './home.scss'
import axios from 'axios'
import Table from '../../components/table/table'
function Home() {
  const [users , setUsers] = useState([])
  const getUser = async () => {
    try{
      const res = await axios.get('http://localhost:3000/users' , {
        headers : {
          authorization : localStorage.getItem('token')
        }
      })
      if(res.data) setUsers(res.data)
    }catch(err){
      if(err?.response?.data?.message) alert(err.response.data.message)
      console.log(err)
    }
  }
  useEffect(() => {
   getUser()
  } ,[])
  return (
    <div className='home'>
      <div className="home_container">
        <h1>Users</h1>
        <Table data={users}/>
      </div>
    </div>
  )
}

export default Home
