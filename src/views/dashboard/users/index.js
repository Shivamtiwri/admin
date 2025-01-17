import React from 'react'
import { useSelector } from 'react-redux'
import Analytics from "../analytics"

const UserDashboard = () => {
  const userData = useSelector((state) => state.auth.userData)


  if (userData?.role === 'admin') {
    return <Analytics />
  }

  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard