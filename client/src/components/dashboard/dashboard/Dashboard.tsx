import React from 'react'
import MobileBarMenu from '../mobile_bar_menu/MobileBarMenu'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <>
      <Outlet />
      <MobileBarMenu />
    </>
  )
}

export default Dashboard